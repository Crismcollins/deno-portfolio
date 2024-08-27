import { 
  GoogleDriveRoutes,
  FilesRoutes,
  TokenRoutes
} from "./Routes/index.ts";
import getResumeHTML from "./CV/index.ts";
import { setAppHono } from "./GlobalStates/tokenState.ts";
import { Hono } from "https://deno.land/x/hono@v3.4.1/mod.ts";

const app = new Hono();
setAppHono(app);

app.get("/", async (c) => {
  const resumeHtml = await getResumeHTML("es");
  return c.html(resumeHtml);
});

// app.get("/", (c) => c.redirect("/token-refresh"));

TokenRoutes(app);
GoogleDriveRoutes(app);
FilesRoutes(app);

Deno.serve(app.fetch);
