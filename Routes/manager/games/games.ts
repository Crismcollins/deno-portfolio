import { Hono } from "https://deno.land/x/hono@v3.4.1/mod.ts";
import { getItem, getTable } from "../../../Supabase/requests/get.ts";
import { Game, GameResponse } from "../../../Supabase/types.ts";
import { addGame, addGameSkill } from "../../../Supabase/requests/add.ts";
import { deleteImagesInStorage, isValidGame, gameListResponseParser } from "../../../helpers.ts";
import { updateGame } from "../../../Supabase/requests/update.ts";
import { deleteGame } from "../../../Supabase/requests/delete.ts";
import { gameResponseParser } from "../../../helpers.ts";
import { Skill } from "../../../Supabase/index.ts";

export const GamesRoutes = (app: Hono) => {

  app.get('/manager/games', async (c) => {
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

    const { data: gameParsed, error: gameError } = await gameResponseParser(games);

    if (gameError)
      return c.json({ gameError }, 500);

    return c.json({ data: gameParsed }, 200);
  });

  app.post('/manager/games', async (c) => {
    const body = await c.req.json();

    const { skills, ...rest } = body;
    
    const isValidBody = isValidGame(rest);

    if (!isValidBody) return c.json({ message: 'Body is not valid'}, 400);

    const { error: errorAddGame, message, status, data } = await addGame(rest);
    
    if (!skills || skills.length <= 0)
      return c.json({ errorAddGame, message }, status);

    const gameId:number = data;
    const gameSkills: Skill[] = skills;
    
    for (const skill of gameSkills) {
      const { error, status: statusGame} = await addGameSkill(gameId, skill.id!);
      
      if (error)
        return c.json({ error }, statusGame);
    }

    // return c.json({ errorAddGame, message }, status);
    return c.json({ message }, 200);
  });

  app.patch('/manager/games', async (c) => {
    const body = await c.req.json();

    const { skills, ...rest } = body;

    const isValidBody = isValidGame(rest);

    if (!isValidBody) return c.json({ message: 'Body is not valid'}, 400);
    
    const { error, status, statusText } = await updateGame(rest, skills);
    
    if (error) return c.json({ error, statusText, status }, status as number);

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