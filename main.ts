import { 
  GoogleDriveRoutes,
  FilesRoutes,
  TokenRoutes
} from "./Routes/index.ts";
import getResumeHTML from "./CV/index.ts";
import { getGoogleDriveToken, setAppHono } from "./GlobalStates/tokenState.ts";
import { Hono } from "https://deno.land/x/hono@v3.4.1/mod.ts";
import { refreshToken } from "./GoogleDrive/fetches.ts";
import { UploadModels } from "./db/index.ts";

UploadModels();

const app = new Hono();
setAppHono(app);

app.get("/", async (c) => {
  const token = getGoogleDriveToken();

  if (!token) {
    const htmlToken = await refreshToken();
    return c.html(htmlToken);
  }

  const resumeHtml = await getResumeHTML("es");
  return c.html(resumeHtml);
});

TokenRoutes(app);
GoogleDriveRoutes(app);
FilesRoutes(app);

Deno.serve(app.fetch);
