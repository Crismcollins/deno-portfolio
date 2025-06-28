import { getItem, getItems } from "../../../Neon/requests/get.ts";
import { Game, GameResponse, GamesSkills } from "../../../Neon/types.ts";
import { addItemToTable, addRelation } from "../../../Neon/requests/add.ts";
import { isValidGame, convertToEmbedUrl } from "../../../helpers.ts";
import { updateRelationTable, updateTable } from "../../../Neon/requests/update.ts";
import { deleteItem } from "../../../Neon/requests/delete.ts";
import { Skill } from "../../../Neon/index.ts";
import { HonoType } from "../../../deps.ts";

export const GamesRoutes = (app: HonoType) => {
  app.get('/manager/games/:id', async (c) => {
    const id = c.req.param('id');
    const { data, error } = await getItem('games', +id);
    
    if (error) return c.json({ message: error.message }, 400);
    if (!data) return c.json({ message: 'Game not found' }, 204);

    const game: Game = data[0];
    
    const { data: gamesSkills, error:gamesSkillsError, message, status } = await getItem('games_skills', game.id, 'game_id');
    
    if (gamesSkillsError) return c.json({ message }, status);

    const games_skills: GamesSkills[] = gamesSkills;

    const skillsId: number[] = games_skills.map(skill => skill.skill_id);

    const { data: skills, error: errorSkills, message: messageSkills, status: statusSkills } = await getItems('skills', skillsId);
    
    if (errorSkills) return c.json({ messageSkills }, statusSkills);

    const gameResponse: GameResponse = {
      ...game,
      skills,
      date_release: new Date(game.date_release).toISOString().slice(0, 10)
    }

    return c.json({ data: gameResponse }, 200);
  });

  app.post('/manager/games', async (c) => {
    const body = await c.req.json();
    
    const { skills, ...rest } = body;
    
    const isValidBody = isValidGame(rest);

    if (!isValidBody) return c.json({ message: 'Body is not valid'}, 400);

    const youtubeUrlEmbed = convertToEmbedUrl(rest.video ?? '')

    const game: Game = {...rest, video: youtubeUrlEmbed ?? rest.video }

    const { error: errorAddGame, status, data } = await addItemToTable('games', game);
    
    if (!skills || skills.length <= 0)
      return c.json({ errorAddGame, message: 'An error occurried while added a skill' }, status);

    const gameId:number = data[0].id;
    const gameSkills: Skill[] = skills;
    
    const { error, status: statusGame} = await addRelation('games_skills', gameSkills, gameId );
      
      if (error)
        return c.json({ error }, statusGame);
    
    return c.json({ message: 'Game added successfully!!' }, 200);
  });

  app.patch('/manager/games', async (c) => {
    const body = await c.req.json();

    const { skills, ...rest } = body;

    const isValidBody = isValidGame(rest);

    if (!isValidBody) return c.json({ message: 'Body is not valid'}, 400);
    
    const youtubeUrlEmbed = convertToEmbedUrl(rest.video ?? '')
    
    const game: Game = {...rest, video: youtubeUrlEmbed ?? rest.video }

    const { data, error, status} = await updateTable('games', game);
    
    if (error) return c.json({ error, status }, status);

    const { error:errorSkills, status: statusSkills } = await updateRelationTable('games_skills', game.id, skills);
    
    if (errorSkills) return c.json({ error, status }, statusSkills);

    return c.json({ data, message: 'Game updated successfully!!' }, 200);
  });

  app.delete('/manager/games/:id', async (c) => {
    const id = c.req.param('id');

    if (!id) return c.json({ message: "id invalid" }, 400);

    const { data: dataGame, error: errorGame } = await deleteItem('games','id',+id);

    if (errorGame) return c.json({ errorGame }, 500);

    return c.json({ dataGame }, 200);
  });
  
}