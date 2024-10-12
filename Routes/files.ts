import { Hono } from "https://deno.land/x/hono@v3.4.1/mod.ts";
import { getFileByName, getFileContentById } from "../GoogleDrive/getMethods.ts";

export function FilesRoutes(app: Hono) {

  app.get("/generate-cv", async (c) => {
    const language = c.req.query('language') || 'es';
    const htmlFileName = `template_CV_${language}`;
    const htmlFile = await getFileByName(htmlFileName, 'text/html');
    const html = await getFileContentById(htmlFile.id);

    if (!html) return c.text('No HTML content provided', 400);

    return c.body(html);
  });
  
}
