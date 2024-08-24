import { Hono } from "https://deno.land/x/hono@v3.4.1/mod.ts";
import { 
  GoogleDriveRoutes,
  FilesRoutes,
  TokenRoutes
} from "./Routes/index.ts";

const app = new Hono();

// app.get("/", (c) => c.redirect("/token-refresh"));

GoogleDriveRoutes(app);
TokenRoutes(app);

Deno.serve(app.fetch);
