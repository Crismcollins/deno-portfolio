import { Hono } from "https://deno.land/x/hono@v3.4.1/mod.ts";
import { isValidJob, jobGamesParser, jobSkillParser } from "../../../helpers.ts";
import { addJob, addJobGame, addJobSkill } from "../../../Supabase/requests/add.ts";
import { updateJob } from "../../../Supabase/requests/update.ts";
import { deleteJob } from "../../../Supabase/requests/delete.ts";
import { getItem } from "../../../Supabase/requests/get.ts";
import { Job, JobResponse } from "../../../Supabase/types.ts";

export const JobsRoutes = (app: Hono) => {

  app.get('/manager/jobs/:id', async (c) => {
    const id = c.req.param('id');
    const { data, error } = await getItem('jobs', +id);
    
    if (error)
      return c.json({ message: error }, 400);

    if (!data)
      return c.json([]);
    
    const jobResponse: JobResponse = data[0];

    const { data: jobGameData, error: jobGameError, status: jobGameStatus } = await jobGamesParser(jobResponse);

    if (jobGameError) return c.json({ message: jobGameError }, jobGameStatus);
    
    const { data: job, error: jobError, status: jobStatus } = await jobSkillParser(jobGameData ?? jobResponse);

    if (jobError) return c.json({ message: jobError }, jobStatus);

    return c.json({ data:job }, 200);
      
  });

	app.post('/manager/jobs', async (c) => {
		const body = await c.req.json();

    const { games, skills, ...rest } = body;

    const isValidBody = isValidJob(body);
    
    if (!isValidBody) return c.json({ message: 'Body is not valid'}, 400);

		const { data, status, message, error } = await addJob(rest);
    
    if (error) return c.json({ message: error }, status);
    
    const job:Job = data[0];
    
    if (games) {
      const { error: jobGameError, status: jobGameStatus } = await addJobGame(games, job.id ?? 0);
		
      if (jobGameError) return c.json({ message: jobGameError }, jobGameStatus);
    }

    if (skills) {
      const { error: jobSkillError , status: jobSkillStatus } = await addJobSkill(skills, job.id ?? 0);

      if (jobSkillError) return c.json({ message: jobSkillError }, jobSkillStatus);
    }

    return c.json({ data, message }, status)
	});

	app.patch('/manager/jobs', async (c) => {
    const body = await c.req.json();

    const { skills, games, ...rest } = body;

    const isValidBody = isValidJob(body);
    
		if (!isValidBody) return c.json({ message: 'Body is not valid'}, 400);
    
		const { data, error } = await updateJob(rest, games, skills);
    
		if (error) return c.json({ message: error }, 500);
    
		return c.json({ data, message: 'Job updated' }, 200);
	});

	app.delete('/manager/jobs/:id', async (c) => {
		const id = c.req.param('id');
    
    const { data, error } = await deleteJob(+id);

    if (error)
      return c.json({ message: error }, 400);

    return c.json({ data, message: 'Job deleted successfully!!' });
	});

}