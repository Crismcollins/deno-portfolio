import { 
  GoogleDriveRoutes,
  FilesRoutes,
  TokenRoutes
} from "./Routes/index.ts";
import getResumeHTML from "./CV/index.ts";
import { getAppHono } from "./GlobalStates/tokenState.ts";

const app = getAppHono();

app.get("/", async (c) => {
  const resumeHtml = await getResumeHTML("es");
  return c.html(resumeHtml);
});

// app.get("/", (c) => c.redirect("/token-refresh"));

TokenRoutes(app);
GoogleDriveRoutes(app);
FilesRoutes(app);

Deno.serve(app.fetch);
