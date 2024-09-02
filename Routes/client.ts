import { Hono } from "https://deno.land/x/hono@v3.4.1/mod.ts";
import { validateLanguage } from "./middlewares.ts";
import { Language } from "../Supabase/types.ts";
import { getTable } from "../Supabase/requests/get.ts";

export function ClientRoutes(app: Hono) {

  app.use('/client/skills/:language?',validateLanguage);
  app.use('/client/jobs/:language?',validateLanguage);
  app.use('/client/educations/:language?',validateLanguage);

  app.get("/client/user/:language?", async (c) => {
    const language = c.req.param('language') as Language || 'en';
  });

  app.get("/client/skills/:language?", async (c) => {
    const language = c.req.param('language') as Language || 'en';
    const data = await getTable('skills', language);

    if (!Array.isArray(data)) return c.json({ message: data }, 500);
    return c.json(data);
  });

  app.get("/client/jobs/:language?", async (c) => {
    const language = c.req.param('language') as Language || 'en';
    const data = await getTable('jobs', language);

    if (!Array.isArray(data)) return c.json({ message: data }, 500);
    return c.json(data);
  });

  app.get("/client/educations/:language?", async (c) => {
    const language = c.req.param('language') as Language || 'en';
    const data = await getTable('educations', language);

    if (!Array.isArray(data)) return c.json({ message: data }, 500);
    return c.json(data);
  });
}
