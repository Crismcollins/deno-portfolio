import { Language } from "../Supabase/types.ts";
import createHeader from "./header/header.ts";
import renderPersonalData from "./personalData/personalData.ts";

const getResumeHTML = async (language: Language) => {
  const globalCss = await Deno.readTextFile("CV/index.css");
  const spacingsCss = await Deno.readTextFile("CV/spacings.css");
  const personalDataCss = await Deno.readTextFile("CV/personalData/personalData.css");
  
  return `
    <html lang="${language}">
    <head>
    <link href="https://fonts.googleapis.com/css2?family=Ubuntu:wght@400;700&display=swap" rel="stylesheet">
      <style>
        ${spacingsCss}
        ${globalCss}
        ${personalDataCss}
      </style>
    </head>
    <body>
    ${createHeader()}
    ${await renderPersonalData()}
    </body>
    </html>
  `
}

export default getResumeHTML;
