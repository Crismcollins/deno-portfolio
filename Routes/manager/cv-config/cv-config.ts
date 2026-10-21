import { HonoType, StatusCode } from "../../../deps.ts";
import { translateContent } from "../../../llm/http.ts";
import { FeatureLLM } from "../../../llm/nvidia_payload.ts";
import { detectLanguage } from "../../../llm/translate/languages.ts";
import { CV_CONTENT_SCHEMA } from "../../../llm/translate/schemas.ts";
import { TranslateCVContentRequest, CVContentContract } from "../../../llm/translate/types.ts";
import sql, { Language } from "../../../Neon/index.ts";
import { uploadCV, enforceCvLimit } from "../../../Storage/index.ts";

const VALID_SECTION_IDS = ["experience", "education", "projects"];

/* ------------------------------------------------------------------ */
/*  user_id temporal (sin auth por ahora)                             */
/* ------------------------------------------------------------------ */
// TODO: reemplazar por el user_id real del usuario autenticado cuando se active el auth.
const TEMP_USER_ID = 1;

type SectionConfig = {
  sectionId: string;
  itemIds: (number | string)[];
};

type CvConfigBody = {
  sections: SectionConfig[];
  sectionOrder: string[];
};

/* ------------------------------------------------------------------ */
/*  Validación del cuerpo                                             */
/* ------------------------------------------------------------------ */
const validateCvConfigBody = (
  body: unknown
): { ok: true; data: CvConfigBody } | { ok: false; message: string } => {
  if (!body || typeof body !== "object") {
    return { ok: false, message: "Cuerpo de solicitud inválido" };
  }

  const { sections, sectionOrder } = body as CvConfigBody;

  if (!Array.isArray(sections) || !Array.isArray(sectionOrder)) {
    return { ok: false, message: "sections y sectionOrder deben ser arreglos" };
  }

  for (const section of sections) {
    if (
      !section ||
      typeof section.sectionId !== "string" ||
      !VALID_SECTION_IDS.includes(section.sectionId) ||
      !Array.isArray(section.itemIds) ||
      !section.itemIds.every(
        (id) => typeof id === "number" || typeof id === "string"
      )
    ) {
      return { ok: false, message: "sectionId o itemIds inválidos" };
    }
  }

  return {
    ok: true,
    data: {
      sections: sections.map((s) => ({
        sectionId: s.sectionId,
        itemIds: s.itemIds,
      })),
      sectionOrder: sectionOrder as string[],
    },
  };
};

/* ------------------------------------------------------------------ */
/*  Rutas                                                             */
/* ------------------------------------------------------------------ */
export const CvConfigRoutes = (app: HonoType) => {
  /* ---------------- GET /manager/cv-config ---------------- */
  app.get("/manager/cv-config", async (c) => {
    try {
      const result = await sql`
        SELECT sections_config
        FROM cv_configs
        WHERE user_id = ${TEMP_USER_ID}
      `;

      const rows: Array<{ sections_config: unknown }> = result as unknown as Array<{
        sections_config: unknown;
      }>;

      const config =
        rows[0]?.sections_config ?? { sections: [], sectionOrder: [] };

      return c.json(
        {
          data: config,
          message: "OK",
          status: 200,
          error: "",
        },
        200
      );
    } catch (error) {
      return c.json(
        {
          data: null,
          message: "Error al obtener configuración",
          status: 500,
          error: error.message,
        },
        500
      );
    }
  });

  /* ---------------- POST /manager/cv-config (upsert) ---------------- */
  app.post("/manager/cv-config", async (c) => {
    let body: unknown;
    try {
      body = await c.req.json();
    } catch {
      return c.json(
        {
          data: null,
          message: "JSON inválido",
          status: 400,
          error: "Invalid JSON",
        },
        400
      );
    }

    const validation = validateCvConfigBody(body);
    if (!validation.ok) {
      return c.json(
        {
          data: null,
          message: validation.message,
          status: 400,
          error: "Validation error",
        },
        400
      );
    }

    const { sections, sectionOrder } = validation.data;
    const payload = { sections, sectionOrder };
    const payloadJson = JSON.stringify(payload);

    try {
      const existing = await sql`
        SELECT id
        FROM cv_configs
        WHERE user_id = ${TEMP_USER_ID}
      `;

      const rows: Array<{ id: number }> = existing as unknown as Array<{
        id: number;
      }>;

      if (rows.length > 0) {
        // Actualizar configuración existente
        await sql`
          UPDATE cv_configs
          SET sections_config = ${payloadJson}::jsonb,
              updated_at = NOW()
          WHERE user_id = ${TEMP_USER_ID}
        `;
      } else {
        // Insertar nueva configuración
        await sql`
          INSERT INTO cv_configs (user_id, sections_config, title, is_default, created_at, updated_at)
          VALUES (${TEMP_USER_ID}, ${payloadJson}::jsonb, 'CV Principal', FALSE, NOW(), NOW())
        `;
      }

      return c.json(
        {
          data: null,
          message: "Configuración guardada",
          status: 200,
          error: "",
        },
        200
      );
    } catch (error) {
      return c.json(
        {
          data: null,
          message: "Error al guardar configuración",
          status: 500,
          error: error.message,
        },
        500
      );
    }
  });

  /* ---------------- POST /manager/cv/pdf ---------------- */
  app.post("/manager/cv/pdf", async (c) => {
    const formData = await c.req.formData();
    const file = formData.get("file") as File | null;
    const contentStr = formData.get("content") as string | null;
    const languageTarget = formData.get("languageTarget") as string | null;

    if (!file) {
      return c.json(
        { data: null, message: "Campo 'file' es requerido", status: 400, error: "" },
        400
      );
    }

    const MAX_FILE_SIZE = 20 * 1024 * 1024; // 20 MB
    if (file.size > MAX_FILE_SIZE) {
      return c.json(
        {
          data: null,
          message: `El archivo excede el límite de 20 MB. Tamaño actual: ${(file.size / 1024 / 1024).toFixed(2)} MB`,
          status: 400,
          error: "File too large",
        },
        400
      );
    }

    if (!contentStr) {
      return c.json(
        { data: null, message: "Campo 'content' es requerido", status: 400, error: "" },
        400
      );
    }

    if (!languageTarget) {
      return c.json(
        { data: null, message: "Campo 'languageTarget' es requerido", status: 400, error: "" },
        400
      );
    }

    let content: CVContentContract;
    try {
      content = JSON.parse(contentStr) as CVContentContract;
    } catch {
      return c.json(
        { data: null, message: "Campo 'content' debe ser un JSON válido", status: 400, error: "" },
        400
      );
    }

    const languageSource = detectLanguage(
      content.description,
    ) as Language;

    const targetLanguage = languageTarget as Language;

    /* ------------------------------------------------------------------ */
    /*  Obtener nombre del usuario para generar el nombre del archivo     */
    /* ------------------------------------------------------------------ */
    const userRows = await sql`
      SELECT full_name
      FROM users
      WHERE id = ${TEMP_USER_ID}
    `;

    const user = (userRows as Array<{ full_name: string }>)[0];
    const userName = user?.full_name ?? "usuario";

    /* Remover acentos/diacríticos antes de limpiar el nombre */
    const removeAccents = (text: string): string =>
      text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

    const safeUserName = removeAccents(userName)
      .toLowerCase()
      .replace(/\s+/g, "_")
      .replace(/[^a-z0-9_]/g, "");

    const languageSuffix =
      targetLanguage === "en" ? "EN" : targetLanguage === "es" ? "ES" : (targetLanguage as string).toUpperCase();

    const filename = `${safeUserName}_CV_${languageSuffix}.pdf`;

    /* ------------------------------------------------------------------ */
    /*  Límite de versiones: eliminar el más antiguo si supera 5 CVs      */
    /* ------------------------------------------------------------------ */
    const limitResult = await enforceCvLimit(safeUserName, targetLanguage, 5);
    if (limitResult.error) {
      console.error("Error al aplicar límite de CVs:", limitResult.error);
    } else if (limitResult.deleted && limitResult.deleted > 0) {
      console.error(`Se eliminaron ${limitResult.deleted} CV antiguo(s) por límite de 5 versiones`);
    }

    /* ------------------------------------------------------------------ */
    /*  Idioma igual: guardar PDF directo en ImageKit                     */
    /* ------------------------------------------------------------------ */
    if (languageSource === targetLanguage) {
      const { data, error, status } = await uploadCV(file, filename);

      if (error) {
        return c.json(
          {
            data: null,
            message: "Error al subir el CV a ImageKit",
            status,
            error,
          },
          status as StatusCode
        );
      }

      return c.json(
        {
          action: "download",
          data: {
            url: (data as { url?: string })?.url ?? null,
            fileId: (data as { fileId?: string })?.fileId ?? null,
            name: (data as { name?: string })?.name ?? null,
          },
          message: "CV subido correctamente",
          status: 200,
          error: "",
        },
        200
      );
    }

    /* ------------------------------------------------------------------ */
    /*  Idioma distinto: traducir el contenido y devolverlo al front      */
    /* ------------------------------------------------------------------ */
    try {
      const response = await translateContent(
        FeatureLLM.translate,
        { content, languageTarget: targetLanguage },
        languageSource,
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Error de NVIDIA:", response.status, errorText);

        return c.json(
          { success: false, error: "Error al traducir el contenido" },
          502,
        );
      }

      const result = await response.json();
      const translatedContentRaw = result.choices[0]?.message?.content;

      if (typeof translatedContentRaw !== "string" || !translatedContentRaw.trim()) {
        return c.json(
          { success: false, error: "NVIDIA devolvió una respuesta vacía" },
          502,
        );
      }

      const translatedContent = CV_CONTENT_SCHEMA.parse(
        JSON.parse(translatedContentRaw),
      );

      return c.json(
        {
          action: "translate",
          data: translatedContent,
          message: "Contenido traducido. Renderice el PDF y súbalo nuevamente.",
          status: 200,
          error: "",
        },
        200
      );
    } catch (error) {
      console.error("Error de traducción:", error);

      return c.json(
        { success: false, error: "NVIDIA devolvió JSON inválido" },
        502,
      );
    }
  });

  app.post("/manager/cv/translate", async (c) => {
    let content: string | undefined;

    try {
      const body: TranslateCVContentRequest = await c.req.json();

      const languageSource = detectLanguage(
        body.content.description,
      ) as Language;

      const response = await translateContent(
        FeatureLLM.translate,
        body,
        languageSource,
      );

      if (!response.ok) {
        const error = await response.text();
        console.error("Error de NVIDIA:", response.status, error);

        return c.json(
          { success: false, error: "Error al traducir el contenido" },
          502,
        );
      }

      const result = await response.json();
      content = result.choices[0]?.message?.content;

      if (typeof content !== "string" || !content.trim()) {
        console.error("Respuesta vacía de NVIDIA:", result);

        return c.json(
          { success: false, error: "NVIDIA devolvió una respuesta vacía" },
          502,
        );
      }

      try {
        const translatedContent = CV_CONTENT_SCHEMA.parse(
          JSON.parse(content),
        );

        return c.json({
          success: true,
          data: translatedContent,
        });
      } catch (error) {
        console.error("Respuesta inválida de NVIDIA:", error);
        console.error("Contenido recibido:", content);

        return c.json(
          { success: false, error: "La respuesta no cumple el schema esperado" },
          502,
        );
      }
    } catch (error) {
      console.error("Error:", error);

      if (content) {
        const match = String(error).match(/position (\d+)/);
        const position = match ? Number(match[1]) : 0;
        console.error("Fragmento:", content.slice(position - 150, position + 150));
        console.error("Carácter:", JSON.stringify(content[position]));
      }

      return c.json(
        { success: false, error: "NVIDIA devolvió JSON inválido" },
        502,
      );
    }
  });
};
