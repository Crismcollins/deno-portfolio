import { Hono } from "https://deno.land/x/hono@v3.4.1/mod.ts";
import { getFileByName, getGoogleDriveStorage } from "../GoogleDrive/getMethods.ts";
import { getGoogleDriveImageVisualizerURL } from "../GlobalStates/tokenState.ts";

export function GoogleDriveRoutes(app: Hono) {

  app.get("/storage/all", async (c) => {
    const data = await getGoogleDriveStorage();
    return c.json(data.files);
  });

  app.get("/storage/profile-picture", async (c) => {
    const imageName = "cris";
    const visualizerImageLink = getGoogleDriveImageVisualizerURL();
    const data = await getFileByName(imageName, ['image/jpeg', 'image/png']);
    const imageLink = `${visualizerImageLink}${data.id}`;
    return c.json({data: { ...data, imageLink } });
  });

  app.get("/storage/app-image/:name", async (c) => {
    const appName = c.req.param('name');
    const visualizerImageLink = getGoogleDriveImageVisualizerURL();
    const folderID = Deno.env.get("APPS_FOLDER_ID");
    const imageData = await getFileByName(appName, ['image/jpeg', 'image/png'], folderID);
    const backgroundData = await getFileByName('background-'+appName, ['image/jpeg', 'image/png'], folderID);
    const imageLink = `${visualizerImageLink}${imageData.id}`;
    const backgroundLink = `${visualizerImageLink}${backgroundData.id}`;
    return c.json({ data: {imageLink, backgroundLink} });
  });
}
