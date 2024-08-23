import { Hono } from "https://deno.land/x/hono@v3.4.1/mod.ts";
import { GetLinkAuthorizeApp, getAccessToken } from "./GoogleDrive/google.ts"
// import {}  from "https://googleapis.deno.dev/v1/drive:v3.ts";

let googleDriveToken = "";

const app = new Hono();

// app.get("/", (c) => c.redirect("/link"));

app.get("/token-status", (c) => {
  const { link } = GetLinkAuthorizeApp();

  if (googleDriveToken.length > 0)
    return c.html("Token is OK")
  else
    return c.html(`You need to refresh or create a new token, you can do that click <a href="${link}">HERE</a>`)
});

app.get("/token-refresh", async (c) => {
  const { link } = GetLinkAuthorizeApp();

  const code = c.req.query('code');

  if (!code) return c.json(link);

    try {
      const { token } = await getAccessToken(code);
      googleDriveToken = token;
      return c.html("Token refreshed sucessfully!!")
    } catch (e) {
      return c.json({ error: e })
    }
})

Deno.serve(app.fetch);
