import { HonoType } from "../deps.ts";

export function FilesRoutes(app: HonoType) {

  app.get("/generate-cv", async (c) => {
    const language = c.req.query('language') || 'es';
    const htmlFileName = `template_CV_${language}`;
    const htmlFile = await getFileByName(htmlFileName, 'text/html');
    const html = await getFileContentById(htmlFile.id);

    if (!html) return c.text('No HTML content provided', 400);

    return c.body(html);
  });
  
}
