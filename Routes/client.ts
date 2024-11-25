import { Hono } from "https://deno.land/x/hono@v3.4.1/mod.ts";
import { Education, EducationResponse, GameResponse, Job, JobResponse, Language, Skill, UserResponse } from "../Supabase/types.ts";
import { getTable } from "../Supabase/requests/get.ts";
import { Game, User } from "../Supabase/index.ts";
import { educationListResponseParser, gameListResponseParser, jobListResponseParser, userResponseParser } from "../helpers.ts";

export function ClientRoutes(app: Hono) {

  app.get("/client/user/:language?", async (c) => {
    const language = c.req.param('language') as Language || 'en';
    const users = await getTable('users', language);

    if (!users.data) return c.json({ message: "User doesn't exist" }, 404);

    const user: UserResponse = users.data[0];

    const userParsed: User = userResponseParser(user);

    return c.json({ data: userParsed }, 200);
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
  
    const jobs: Job[] = await jobListResponseParser(jobsResponse);

    return c.json({ data: jobs });
  });

  app.get("/client/educations/:language?", async (c) => {
    const language = c.req.param('language') as Language || 'en';
    const data = await getTable('educations', language);

    if (!data.data) return c.json({ data: [] }, 200);

    const educationsResponse: EducationResponse[] = data.data;
    const educations: Education[] = educationListResponseParser(educationsResponse);

    return c.json({ data: educations }, 200);
  });

  app.get("/client/games/:language", async (c) => {
    const language = c.req.param('language') as Language;

    if (!language) return c.json({ message: 'language was not provided' }, 400);

    const { data, error, status } = await getTable('games', language);

    if (error) return c.json({ message: error.message }, 400);
    if (!data) return c.json({ message: 'No games' }, 204);

    const games: GameResponse[] = data;

    const gamesParsed: Game[] = gameListResponseParser(games);

    return c.json({ data: gamesParsed }, status);
  });
}
