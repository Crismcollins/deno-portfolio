import { Hono } from "https://deno.land/x/hono@v3.4.1/mod.ts";
import { getItem, getTable } from "../../../Supabase/requests/get.ts";
import { Game, GameResponse } from "../../../Supabase/types.ts";
import { addGame } from "../../../Supabase/requests/add.ts";
import { deleteImagesInStorage, isValidGame, gameListResponseParser } from "../../../helpers.ts";
import { updateGame } from "../../../Supabase/requests/update.ts";
import { deleteGame } from "../../../Supabase/requests/delete.ts";
import { gameResponseParser } from "../../../helpers.ts";

export const GamesRoutes = (app: Hono) => {

  app.get('/manager/games/:language?', async (c) => {
    const { data, error, status } = await getTable('games');

    if (error) return c.json({ message: error.message }, 400);
    if (!data) return c.json({ message: 'No games' }, 204);

    const games: GameResponse[] = data;

    const gamesParsed: Game[] = gameListResponseParser(games);

    return c.json({ data: gamesParsed }, status);
  });

  app.get('/manager/games/:id', async (c) => {
    const id = c.req.param('id');
    const { data, error } = await getItem('games', +id);

    if (error) return c.json({ message: error.message }, 400);
    if (!data) return c.json({ message: 'Game not found' }, 204);

    const games: GameResponse = data[0];

    const gameParsed: Game = gameResponseParser(games);

    return c.json({ data: gameParsed }, 200);
  });

  app.post('/manager/games', async (c) => {
    const body = await c.req.json();
    
    const isValidBody = isValidGame(body);

    if (!isValidBody) return c.json({ message: 'Body is not valid'}, 400);

    const { error: errorAddGame, message, status } = await addGame(body);

    return c.json({ errorAddGame, message }, status);
  });

  app.patch('/manager/games', async (c) => {
    const body = await c.req.json();

    const isValidBody = isValidGame(body);

    if (!isValidBody) return c.json({ message: 'Body is not valid'}, 400);

    const { error } = await updateGame(body);

    if (error) c.json({ error }, 500);

    return c.json({ message: 'Game updated successfully!!' }, 200);
  });

  app.delete('/manager/games/:id', async (c) => {
    const id = c.req.param('id');

    if (!id) return c.json({ message: "id invalid" }, 400);

    const { error, status } = await deleteImagesInStorage(+id, 'games');

    if (error) return c.json({ error }, status);

    const { data: dataGame, error: errorGame } = await deleteGame(+id);

    if (errorGame) return c.json({ errorGame }, 500);

    return c.json({ dataGame }, 200);
  });
  
}