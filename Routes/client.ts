import { EducationResponse, GameResponse, Job, JobResponse, Language, Skill, UserResponse, JobsSkills, JobsGames } from "../Neon/types.ts";
import { getItem, getItems, getTable } from "../Neon/requests/get.ts";
import { HonoType } from "../deps.ts";
import { convertTimeStampToYYMM, sortJobs } from "../helpers.ts";
import { Education } from "../Neon/types.ts";

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
    
    const jobsResponse: Job[] = data.data;

    const jobsSorted: Job[] = sortJobs(jobsResponse);

    const jobs: JobResponse[] = await Promise.all(
      jobsSorted.map(async (jobResponse) => {
        const { data, error } = await getItem('jobs_skills', jobResponse.id, 'job_id');
        
        if (error) throw new Error(error);
  
        const jobsSkills: JobsSkills[] = data;
        
        const jobsSkillsIds: number[] = jobsSkills.map(jobSkill => jobSkill.skill_id);
        
        const { data: skills, error: skillsError } = await getItems('skills', jobsSkillsIds);

        if (skillsError) throw new Error(skillsError);

        const { data: jobGamesData, error: jobsGamesError } = await getItem('jobs_games', jobResponse.id, 'job_id');
  
        if (jobsGamesError) throw new Error(jobsGamesError);
  
        const jobsGames: JobsGames[] = jobGamesData;

        const jobsGamesIds: number[] = jobsGames.map(jobGames => jobGames.game_id);

        const { data: games, error: gamesError } = await getItems('games', jobsGamesIds)

        if (gamesError) throw new Error(gamesError);

        const jobs: Job = { 
          ...jobResponse,
          start_date: convertTimeStampToYYMM(jobResponse.start_date),
          end_date: jobResponse.end_date ? convertTimeStampToYYMM(jobResponse.end_date) : language === 'en' ? 'Present' : 'Presente',
        }
  
        return { ...jobs, skills, games };
      })
    )

    return c.json({ data: jobs }, 200);
  });

  app.get("/client/educations/:language?", async (c) => {
    const language = c.req.param('language') as Language || 'en';
    const data = await getTable('educations', language);

    if (!data.data) return c.json({ data: [] }, 200);

    const educationsResponse: Education[] = data.data;

    const educations: EducationResponse[] = educationsResponse.map(education => ( { ...education, start_date: convertTimeStampToYYMM(education.start_date) , end_date: convertTimeStampToYYMM(education.end_date) }))

    return c.json({ data: educations }, 200);
  });

  app.get("/client/games/:language", async (c) => {
    const language = c.req.param('language') as Language;

    if (!language) return c.json({ message: 'language was not provided' }, 400);

    const { data, error } = await getTable('games', language);

    if (error) return c.json({ message: error.message }, 400);
    if (!data) return c.json({ message: 'No games' }, 204);

    const games: GameResponse[] = data;

    return c.json({ data: games }, 200);
  });
}
