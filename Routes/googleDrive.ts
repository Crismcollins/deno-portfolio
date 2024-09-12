import { Hono } from "https://deno.land/x/hono@v3.4.1/mod.ts";
import { getFileByName, getGoogleDriveStorage } from "../GoogleDrive/fetches.ts";

export function GoogleDriveRoutes(app: Hono) {

  app.get("/storage", async (c) => {
    const data = await getGoogleDriveStorage();
    return c.json(data.files);
  });

  app.get("/profile-picture", async (c) => {
    const imageName = "cris";
    const data = await getFileByName(imageName, ['image/jpeg', 'image/png']);
    const imageLink = `https://drive.google.com/thumbnail?id=${data.id}`;
    return c.json({data: { data, imageLink } });
  });
}
