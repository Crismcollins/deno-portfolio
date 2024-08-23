import { Hono } from "https://deno.land/x/hono@v3.4.1/mod.ts";
// import { readData } from "./helpers.ts";
// import { DOMParser } from 'https://deno.land/x/deno_dom/deno-dom-wasm.ts';
// import { assert } from "jsr:@std/assert@1";
// import { GoogleDrive } from "https://deno.land/x.google/drive.ts";

import { GetLinkAuthorizeApp } from "./helpers.ts";

const link = GetLinkAuthorizeApp();

// app.get("/", (c) => c.redirect("/link"));

const app = new Hono();
// app.get("/", (c) => c.redirect("/link"));

app.get("/link", (c) => {
  return c.json({link});
});

// const authUrl = oauth2Client.generateAuthUrl({
//   access_type: "offline",
//   scope: ["https://www.googleapis.com/auth/drive"],
// });

// const link = authUrl.buildAuthLink();

// const tokens = await authUrl.getTokens(code);

// const accessToken = ga.getAccessToken(tokens);

// console.log("Autoriza la app visitando esta URL:", link);

// Después de que el usuario autorice la app, recibe un código de autenticación.
// Usa ese código para obtener un token:
// const { tokens } = await oauth2Client.getToken("<AUTHORIZATION_CODE>");
// oauth2Client.setCredentials(tokens);



// const drive = google.drive({ version: "v3", auth: oauth2Client });

// // Listar los archivos en Google Drive:
// const res = await drive.files.list();
// console.log("Archivos en Google Drive:", res.data.files);








// const LINKEDIN_PROFILE = "https://www.linkedin.com/in/cristobal-alejandro-molina-collins-b595a8140/";

// app.get("", (c) => c.redirect(link));

// app.get("/scrape", async (c) => {
//   const url = LINKEDIN_PROFILE;
  
//   try {
//     const response = await fetch(url);
//     console.log(response)
    
//     if (!response.ok) {
//       console.error(`Failed to fetch page: ${response.statusText}`);
//       return c.json({ error: `Failed to fetch page: ${response.statusText}` }, response.status);
//     }
//     const html = await response.text();
//     // const $ = cheerio.load(html);
//     const document = new DOMParser().parseFromString(html, "text/html");
    
    
//     const li = document?.querySelectorAll("li");
    
//     li?.forEach((item) => {
//       console.log(item.textContent);
//     });

    
//     // const filteredElements = $('[data-view-name="profile-component-entity"]');
    
//     // const result = filteredElements.map((i, el) => $(el).text()).get();
//     // return c.json({ elements: result });
//     return c.json({ name: "HOLA", url })
//   } catch (error) {
//     // Manejar errores inesperados
//     console.error(error);
//     return c.json({ error: 'An unexpected error occurred' }, 500);
//   }
// });

// app.get("/file", async (c) => {
//   const data = await readData();
//   return c.json(data);
// });

Deno.serve(app.fetch);