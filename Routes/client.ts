import { EducationResponse, Game, GameResponse, Job, JobResponse, Language, Skill, UserResponse, JobsSkills, JobsGames } from "../Neon/types.ts";
import { getItem, getItems, getTable } from "../Neon/requests/get.ts";
import { HonoType, StatusCode } from "../deps.ts";
import { convertTimeStampToYYMM, sortJobs } from "../helpers.ts";
import { Education } from "../Neon/types.ts";
import { getLatestCV } from "../Storage/index.ts";

export function ClientRoutes(app: HonoType) {

  app.get("/client/user/:language?", async (c) => {
    const language = c.req.param('language') as Language || 'en';
    const users = await getTable<UserResponse>('users', language);

    if (!users.data) return c.json({ message: "User doesn't exist" }, 404);

    const user: UserResponse = users.data[0];

    return c.json({ data: user }, 200);
  });

  app.get("/client/skills/:language?", async (c) => {
    const language = c.req.param('language') as Language || 'en';
    const data = await getTable<Skill>('skills');

    if (!data.data) return c.json({ message: data }, 500);

    const skills: Skill[] = data.data;

    const hardSkills = skills.filter(skill => skill.type === 'hard');
    const softSkills = skills.filter(skill => skill.type === 'soft' && skill.language === language);

    return c.json({ data: [...hardSkills, ...softSkills] }, 200);
  });

  app.get("/client/jobs", async (c) => {
    const data = await getTable<Job>('jobs');
    return c.json(data);
  });

  app.get("/client/jobs/:language?", async (c) => {
    const language = c.req.param('language') as Language || 'en';

    const data = await getTable<Job>('jobs', language);

    if (!data.data) return c.json({ data: [] }, 200);

    const jobsResponse: Job[] = data.data;

    const jobsSorted: Job[] = sortJobs(jobsResponse);

    const jobs: JobResponse[] = await Promise.all(
      jobsSorted.map(async (jobResponse) => {
        const { data, error } = await getItem<JobsSkills>('jobs_skills', jobResponse.id, 'job_id');

        if (error) throw new Error(error);

        const jobsSkills: JobsSkills[] = data;

        const jobsSkillsIds: number[] = jobsSkills.map(jobSkill => jobSkill.skill_id);

        const { data: skills, error: skillsError } = await getItems<Skill>('skills', jobsSkillsIds);

        if (skillsError) throw new Error(skillsError);

        const { data: jobGamesData, error: jobsGamesError } = await getItem<JobsGames>('jobs_games', jobResponse.id, 'job_id');

        if (jobsGamesError) throw new Error(jobsGamesError);

        const jobsGames: JobsGames[] = jobGamesData;

        const jobsGamesIds: number[] = jobsGames.map(jobGames => jobGames.game_id);

        const { data: games, error: gamesError } = await getItems<Game>('games', jobsGamesIds)

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
    const data = await getTable<Education>('educations', language);

    if (!data.data) return c.json({ data: [] }, 200);

    const educationsResponse: Education[] = data.data;

    const educations: EducationResponse[] = educationsResponse.map(education => ({ ...education, start_date: convertTimeStampToYYMM(education.start_date), end_date: convertTimeStampToYYMM(education.end_date) }))

    return c.json({ data: educations }, 200);
  });

  app.get("/client/games/:language", async (c) => {
    const language = c.req.param('language') as Language;

    if (!language) return c.json({ message: 'language was not provided' }, 400);

    const { data, error } = await getTable<GameResponse>('games', language);

    if (error) return c.json({ message: error.message }, 400);
    if (!data) return c.json({ message: 'No games' }, 204);

    const games: GameResponse[] = data;

    return c.json({ data: games }, 200);
  });

  /* ---------------- GET /client/cv/pdf/:language ---------------- */
  app.get("/client/cv/pdf/:language", async (c) => {
    const language = c.req.param("language") as Language;

    if (language !== "en" && language !== "es") {
      return c.json(
        { data: null, message: "Idioma no soportado. Use 'en' o 'es'", status: 400, error: "" },
        400
      );
    }

    const { data, error, status } = await getLatestCV(language);

    if (error) {
      return c.json(
        { data: null, message: "No se pudo obtener el CV", status, error },
        status as StatusCode
      );
    }

    const latest = data as { url?: string; name?: string };
    const fileUrl = latest.url;
    const filename = latest.name || `cv_${language}.pdf`;

    if (!fileUrl) {
      return c.json(
        { data: null, message: "CV no encontrado", status: 404, error: "" },
        404
      );
    }

    try {
      const response = await fetch(fileUrl);
      if (!response.ok) {
        return c.json(
          { data: null, message: "No se pudo descargar el PDF de ImageKit", status: response.status, error: "" },
          response.status as StatusCode
        );
      }

      const arrayBuffer = await response.arrayBuffer();

      return c.body(arrayBuffer, 200, {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${filename}"`,
        "Access-Control-Expose-Headers": "Content-Disposition",
      });
    } catch (error) {
      return c.json(
        { data: null, message: "Error al entregar el PDF", status: 500, error: error.message },
        500
      );
    }
  });
}
