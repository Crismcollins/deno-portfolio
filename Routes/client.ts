import { Hono } from "https://deno.land/x/hono@v3.4.1/mod.ts";
import { GameResponse, Language } from "../Supabase/types.ts";
import { getTable } from "../Supabase/requests/get.ts";
import { Game } from "../Supabase/index.ts";
import { gameListResponseParser } from "../helpers.ts";

export function ClientRoutes(app: Hono) {

  app.get("/client/user/:language?", async (c) => {
    const language = c.req.param('language') as Language || 'en';
    const data = await getTable('users', language);
    if (!data.data) return c.json({ message: data }, 500);
    return c.json({data: data.data[0]});
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

  app.get("/client/games/:language", async (c) => {
    const language = c.req.param('language') as Language;

    if (!language) return c.json({ message: 'language was not provided'}, 400);

    const { data, error, status } = await getTable('games', language);

    if (error) return c.json({ message: error.message }, 400);
    if (!data) return c.json({ message: 'No games' }, 204);

    const games: GameResponse[] = data;

    const gamesParsed: Game[] = gameListResponseParser(games);

    return c.json({ data: gamesParsed }, status);
  });
}
