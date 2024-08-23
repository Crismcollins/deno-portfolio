import { GoogleOAuth } from "https://deno.land/x/google@0.0.8/oauth.ts";
// import { serve } from "https://deno.land/std/http/server.ts";

// export async function readData() {
//   try {
//     const data = await Deno.readTextFile(DATA_FILE);
//     return JSON.parse(data);
//   } catch {
//     return [];
//   }
// }

// export async function writeData(data: any) {
//   await Deno.writeTextFile(DATA_FILE, JSON.stringify(data, null, 2));
// }


export function  GetLinkAuthorizeApp() {
  const oauth2Client = new GoogleOAuth({
    client_id: Deno.env.get("CLIENT_ID") ?? '',
    client_secret: Deno.env.get("CLIENT_SECRET") ?? '',
    redirect_uri: Deno.env.get("REDIRECT_URI") ?? '',
    "scopes": ["https://www.googleapis.com/auth/drive"],
  });
  
  const link = oauth2Client.buildAuthLink();
  return link;
}