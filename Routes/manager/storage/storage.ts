import { HonoType } from "../../../deps.ts";
import { fetchStorage, removeFile, uploadToStorage } from "../../../Storage/index.ts";


export const StorageRoutes = (app: HonoType) => {

  app.get("/manager/storage", async (c) => {
    const { data, error, status } = await fetchStorage();
    return c.json( { data, error, status } );
  });

  app.post("/manager/storage", async (c) => {
    const formData = await c.req.formData();
    const fileResponses: FormDataEntryValue[] = [];

    for (const [_, file] of formData.entries()) {
      if (!(file instanceof File)) continue;
  
      const { data, error, status } = await uploadToStorage(file);

      if (error) {
        console.log(error)
        return c.json({ data, error, status });
      }

      fileResponses.push(file);
    }

    return c.json({ files: fileResponses, error:null, status: 200 }, 200);
});


  app.delete('/manager/storage/:id', async (c) => {
    const id = c.req.param('id');

    const { data, error, status } = await removeFile(id);
    
    if (error) return c.json({ data: null, error, status }, 400);
    
    return c.json({ data, error: null }, 200);
  });
}
