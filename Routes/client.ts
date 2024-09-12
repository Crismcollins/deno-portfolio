import { Hono } from "https://deno.land/x/hono@v3.4.1/mod.ts";
import { Language } from "../Supabase/types.ts";
import { getTable } from "../Supabase/requests/get.ts";

export function ClientRoutes(app: Hono) {

  app.get("/client/user/:language?", async (c) => {
    const language = c.req.param('language') as Language || 'en';
  });

  app.get("/client/skills/:language?", async (c) => {
    const language = c.req.param('language') as Language || 'en';
    const data = await getTable('skills', language);

    if (!data) return c.json({ message: data }, 500);
    return c.json(data);
  });

  app.get("/client/jobs", async (c) => {
    const data = await getTable('jobs');
    return c.json(data);
  });

  app.get("/client/jobs/:language?", async (c) => {
    const language = c.req.param('language') as Language || 'en';
    const data = await getTable('jobs', language);
    return c.json(data);
  });

  app.get("/client/educations/:language?", async (c) => {
    const language = c.req.param('language') as Language || 'en';
    const data = await getTable('educations', language);
    
    if (!data) return c.json({ message: data }, 500);
    return c.json(data);
  });
}
