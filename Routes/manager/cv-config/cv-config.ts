import { HonoType, StatusCode } from "../../../deps.ts";
import sql from "../../../Neon/index.ts";
import { uploadCV } from "../../../Storage/index.ts";

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
    const filename = formData.get("filename") as string | null;

    if (!file) {
      return c.json(
        { data: null, message: "Campo 'file' es requerido", status: 400, error: "" },
        400
      );
    }

    if (!filename) {
      return c.json(
        { data: null, message: "Campo 'filename' es requerido", status: 400, error: "" },
        400
      );
    }

    const { data, error, status } = await uploadCV(file, filename);

    if (error) {
      return c.json(
        {
          data: null,
          message: "Error al subir el CV a ImageKit",
          status,
          error,
        },
        status
      );
    }

    return c.json(
      {
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
  });
};
