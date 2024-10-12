import { Hono } from "https://deno.land/x/hono@v3.4.1/mod.ts";
import { addImageToStorage, deleteImageByName, getImageLink, getImageLinkByName, getImages } from "../../../Supabase/requests/storage.ts";
import { encodeFileName } from "../../../helpers.ts";
import { CustomFileResponse } from "../../../Supabase/types.ts";


export const StorageRoutes = (app: Hono) => {

  app.get("/manager/storage", async (c) => {
    const imageUrls: CustomFileResponse[] = [];

    const { data, error } = await getImages();

    if (error) return c.json({ data, error }, 500);

    if (!data) return c.json({ data: [], error }, 204);

    const files = data.filter(file => file.metadata.mimetype !== 'application/octet-stream');

    for (const file of files) {
      const imageLink = await getImageLinkByName(file.name);
      imageUrls.push({
        id: file.id,
        name: file.name,
        url: imageLink.data.publicUrl
      });
    }

    return c.json({ data: imageUrls, error }, 200);
  });

  app.post("/manager/storage", async (c) => {
    const formData = await c.req.formData();
    const imageUrls: CustomFileResponse[] = [];

    for (const value of formData.values()) {
      if (value instanceof File) {
        const fileEncoded = encodeFileName(value);
        const { data, error } = await addImageToStorage(fileEncoded);
        
        if (error) {
          console.error(`Error uploading image ${value.name}:`, error);
        } else {
          const imageLink = await getImageLink(data?.path || "");
          
          imageUrls.push({
            id: data?.id || "",
            name: data?.path.split('/').pop() || "",
            url: imageLink,
          });
        }
      }
    }

    return c.json({ images: imageUrls }, 200);
  });

  app.delete('/manager/storage/:name', async (c) => {
    const name = c.req.param('name');

    const { data, error } = await deleteImageByName(name);

    if (error) return c.json({ message:'Error deleting image' ,error }, 400);

    return c.json({ data: { message: 'Image deleted successfully!! ', data } }, 200);
  });
}
