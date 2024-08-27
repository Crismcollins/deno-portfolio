import createHeader from "./header/header.ts";
import renderPersonalData from "./personalData/personalData.ts";

const getResumeHTML = async (language: 'en' | 'es') => {
  const globalCss = await Deno.readTextFile("CV/index.css");
  const spacingsCss = await Deno.readTextFile("CV/spacings.css");
  const token = getResumeHTML();
  
  return `
    <html lang="${language}">
    <head>
    <link href="https://fonts.googleapis.com/css2?family=Ubuntu:wght@400;700&display=swap" rel="stylesheet">
      <style>
        ${spacingsCss}
        ${globalCss}
      </style>
    </head>
    <body>
    token: ${token}
    ${createHeader()}
    ${renderPersonalData()}
    </body>
    </html>
  `
}

export default getResumeHTML;
