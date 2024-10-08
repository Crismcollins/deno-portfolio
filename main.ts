import {
  GoogleDriveRoutes,
  FilesRoutes,
  TokenRoutes
} from "./Routes/index.ts";
import { getGoogleDriveToken, setAppHono } from "./GlobalStates/tokenState.ts";
import { Hono } from "https://deno.land/x/hono@v3.4.1/mod.ts";
import { cors } from "https://deno.land/x/hono@v4.3.11/middleware.ts";
import { UploadModels } from "./db/index.ts";
import { ManagerRoutes } from "./Routes/manager.ts";
import { ClientRoutes } from "./Routes/client.ts";
import { redirectUrl } from "./Routes/middlewares.ts";
import { refreshToken } from "./GoogleDrive/fetches.ts";
import getResumeHTML from "./CV/index.ts";

const app = new Hono();
setAppHono(app);

app.use('*', cors({
  origin: '*',
  allowHeaders: ['Content-Type', 'Authorization'],
  allowMethods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
  exposeHeaders: ['Content-Length', 'X-Kuma-Revision'],
  maxAge: 600,
  credentials: false,
}));

app.use('*', redirectUrl);

app.get("/", async (c) => {
  const token = getGoogleDriveToken();
  console.log(token)
  if (!token) {
    await refreshToken();
  }
  const resumeHtml = await getResumeHTML("es");
  return c.html(resumeHtml);
});

app.get("/models/create", (c) => {
  return c.html(`<button onclick='${UploadModels()}' type="button">Create models</button> />`)
})

app.get("/models/recreate", (c) => {
  return c.html(`<button onclick='${UploadModels(true)}' type="button">Recreate models</button> />`)
})

TokenRoutes(app);
GoogleDriveRoutes(app);
FilesRoutes(app);
ClientRoutes(app);
ManagerRoutes(app);

Deno.serve(app.fetch);
