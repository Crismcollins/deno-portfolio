import { z } from "npm:zod";

export const CV_CONTENT_SCHEMA = z.object({
  description: z.string(),
  studyTitle: z.string().optional(),
  workItems: z.array(
    z.object({
      title: z.string(),
      date: z.string(),
      description: z.string(),
      companyDescription: z.string(),
      achievements: z.string().optional(),
    }).strict(),
  ),

  EducationItems: z.array(
    z.object({
      title: z.string(),
      date: z.string(),
      description: z.string(),
    }).strict(),
  ),

  ProjectItems: z.array(
    z.object({
      title: z.string(),
      description: z.string(),
    }).strict(),
  ),
}).strict();

export type CVContent = z.infer<typeof CV_CONTENT_SCHEMA>;

/* ------------------------------------------------------------------ */
/*  Esquema JSON plano para "guided_json" de NVIDIA NIM               */
/*  Obliga al modelo a generar siempre un JSON válido que cumpla      */
/*  la estructura del CV. NVIDIA recomienda guided_json sobre         */
/*  response_format={"type":"json_object"} para structured generation. */
/* ------------------------------------------------------------------ */
export const CV_CONTENT_JSON_SCHEMA = {
  type: "object",
  properties: {
    description: { type: "string" },
    studyTitle: { type: "string" },
    workItems: {
      type: "array",
      items: {
        type: "object",
        properties: {
          title: { type: "string" },
          date: { type: "string" },
          description: { type: "string" },
          companyDescription: { type: "string" },
          achievements: { type: "string" },
        },
        required: ["title", "date", "description", "companyDescription"],
        additionalProperties: false,
      },
    },
    EducationItems: {
      type: "array",
      items: {
        type: "object",
        properties: {
          title: { type: "string" },
          date: { type: "string" },
          description: { type: "string" },
        },
        required: ["title", "date", "description"],
        additionalProperties: false,
      },
    },
    ProjectItems: {
      type: "array",
      items: {
        type: "object",
        properties: {
          title: { type: "string" },
          description: { type: "string" },
        },
        required: ["title", "description"],
        additionalProperties: false,
      },
    },
  },
  required: ["description", "workItems", "EducationItems", "ProjectItems"],
  additionalProperties: false,
};