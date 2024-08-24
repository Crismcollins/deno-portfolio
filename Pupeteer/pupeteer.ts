import puppeteer from "https://deno.land/x/puppeteer@16.2.0/mod.ts";

export async function generatePdfFromHtml(html:string): Promise<Uint8Array> {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setContent(html);
  const pdfBuffer = await page.pdf({ format: 'A4' });
  await browser.close();

  return pdfBuffer;
}
