import { Hono } from "https://deno.land/x/hono@v3.4.1/mod.ts";
import { GetLinkAuthorizeApp, getAccessToken } from "../GoogleDrive/google.ts"
import { getGoogleDriveToken, setGoogleDriveToken } from "../GlobalStates/tokenState.ts";

export function TokenRoutes(app: Hono) {
  app.get("/token-status", (c) => {

    const googleDriveToken = getGoogleDriveToken();

    if (googleDriveToken.length > 0)
      return c.html("Token is OK")
    else {
      const { link } = GetLinkAuthorizeApp();
      return c.html(`You need to refresh or create a new token, you can do that click <a href="${link}">HERE</a>`)
    }
  });
  
  app.get("/token-refresh", async (c) => {
    const { link } = GetLinkAuthorizeApp();
    const code = c.req.query('code');
  
    if (!code) return c.html(`<a href="${link}">REFRESH TOKEN</a>`);
      try {
        const { token } = await getAccessToken(code);
        setGoogleDriveToken(token);
        return c.html("Token refreshed sucessfully!!")
      } catch (e) {
        return c.json({ error: e })
      }
  })
}
