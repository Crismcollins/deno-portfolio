import { EducationResponse, GameResponse, JobResponse, Language, Skill, UserResponse } from "../Neon/types.ts";
import { getTable } from "../Neon/requests/get.ts";
import { HonoType } from "../deps.ts";

export function ClientRoutes(app: HonoType) {

  app.get("/client/user/:language?", async (c) => {
    const language = c.req.param('language') as Language || 'en';
    const users = await getTable('users', language);

    if (!users.data) return c.json({ message: "User doesn't exist" }, 404);

    const user: UserResponse = users.data[0];

    return c.json({ data: user }, 200);
  });

  app.get("/client/skills/:language?", async (c) => {
    const language = c.req.param('language') as Language || 'en';
    const data = await getTable('skills');
    
    if (!data.data) return c.json({ message: data }, 500);

    const skills: Skill[] = data.data;

    const hardSkills = skills.filter(skill => skill.type === 'hard');
    const softSkills = skills.filter(skill => skill.type === 'soft' && skill.language === language);

    return c.json({ data: [ ...hardSkills, ...softSkills ]}, 200);
  });

  app.get("/client/jobs", async (c) => {
    const data = await getTable('jobs');
    return c.json(data);
  });

  app.get("/client/jobs/:language?", async (c) => {
    const language = c.req.param('language') as Language || 'en';
    
    const data = await getTable('jobs', language);
    
    if (!data.data) return c.json({ data: [] }, 200);
    
    const jobsResponse: JobResponse[] = data.data;
    
    return c.json({ data: jobsResponse });
  });

  app.get("/client/educations/:language?", async (c) => {
    const language = c.req.param('language') as Language || 'en';
    const data = await getTable('educations', language);

    if (!data.data) return c.json({ data: [] }, 200);

    const educationsResponse: EducationResponse[] = data.data;

    return c.json({ data: educationsResponse }, 200);
  });

  app.get("/client/games/:language", async (c) => {
    const language = c.req.param('language') as Language;

    if (!language) return c.json({ message: 'language was not provided' }, 400);

    const { data, error } = await getTable('games', language);

    if (error) return c.json({ message: error.message }, 400);
    if (!data) return c.json({ message: 'No games' }, 204);

    const games: GameResponse[] = data;

    // const gamesParsed: Game[] = gameListResponseParser(games);

    return c.json({ data: games }, 200);
  });
}
