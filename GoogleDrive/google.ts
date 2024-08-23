import { GoogleOAuth } from "https://deno.land/x/google@0.0.8/oauth.ts";

export function connectGoogleOAuth() {
  const oauth2Client = new GoogleOAuth({
    client_id: Deno.env.get("CLIENT_ID") ?? '',
    client_secret: Deno.env.get("CLIENT_SECRET") ?? '',
    redirect_uri: Deno.env.get("REDIRECT_URI") ?? '',
    "scopes": ["https://www.googleapis.com/auth/drive"],
  });
  return oauth2Client;
}

export function  GetLinkAuthorizeApp() {
  const oauth = connectGoogleOAuth();
  const link = oauth.buildAuthLink();
  return { link };
}

export async function getAccessToken(code: string) {
  const oauth = connectGoogleOAuth();
  const { access_token, token_type } = await oauth.getTokens(code);
  const token = `${token_type} ${access_token}`;
  
  return { token }
}
