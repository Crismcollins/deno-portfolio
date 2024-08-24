import { Hono } from "https://deno.land/x/hono@v3.4.1/mod.ts";
import { getFileByName } from "../GoogleDrive/fetches.ts";
import { generatePdfFromHtml } from "../Pupeteer/pupeteer.ts"
import { getFileContent } from "../helpers.ts";

export function FilesRoutes(app: Hono) {

  app.get("/generate-cv/", async (c) => {
    const language = c.req.query('language') || 'es';
    const htmlFile = `template_CV_${language}`;
    const htmlContent = await getFileContent(htmlFile);

    return c.text(htmlContent);
    // const html = await getFileByName(htmlContent);

    // if (!html) return c.text('No HTML content provided', 400);

    // try {
    //   const pdfBuffer = generatePdfFromHtml(html);

    //   return c
    //         .header('Content-Disposition', 'attachment; filename="document.pdf"')
    //         .header('Content-Type', 'application/pdf')
    //         .body(pdfBuffer);

    // } catch (e) {
    //   return c.text('Error generating PDF: '+e, 500);
    // }
  });
}
