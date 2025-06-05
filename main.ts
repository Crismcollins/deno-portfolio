import {
  GoogleDriveRoutes,
  FilesRoutes,
  TokenRoutes
} from "./Routes/index.ts";
import { setAppHono } from "./GlobalStates/tokenState.ts";
import { Hono } from "https://deno.land/x/hono@v3.4.1/mod.ts";
import { cors } from "https://deno.land/x/hono@v4.3.11/middleware.ts";
// import { UploadModels } from "./db/index.ts";
import { ManagerRoutes } from "./Routes/manager.ts";
import { ClientRoutes } from "./Routes/client.ts";
import { redirectUrl } from "./Routes/middlewares.ts"
import { executeAllMigrations } from "./db/Migrations/index.ts";
import { UploadModels } from "./db/index.ts";

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

app.get("/", (c) => {
  return c.text('Hello world!');
});

app.get("/models/create", async (c) => {
  const message = await UploadModels(true);
  const { error } = await executeAllMigrations();

  return c.html(`<p>MODELS STATUS: ${message}</p><br><p>MIGRATION STATUS: ${error}</p>`)
})

app.get("/models/migrations", async (c) => {
  const { error } = await executeAllMigrations();

  return c.html(`<p>MIGRATION STATUS: ${error ?? 'Migrations executed successfully!!'}</p>`)
})

TokenRoutes(app);
GoogleDriveRoutes(app);
FilesRoutes(app);
ClientRoutes(app);
ManagerRoutes(app);

Deno.serve(app.fetch);
