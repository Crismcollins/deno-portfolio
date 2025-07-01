import { isValidJob } from "../../../helpers.ts";
import { addItemToTable, addRelation } from "../../../Neon/requests/add.ts";
import { updateRelationTable, updateTable } from "../../../Neon/requests/update.ts";
import { deleteItem } from "../../../Neon/requests/delete.ts";
import { getItem, getItems } from "../../../Neon/requests/get.ts";
import { Job, JobResponse, JobsGames, JobsSkills } from "../../../Neon/types.ts";
import { HonoType } from "../../../deps.ts";

export const JobsRoutes = (app: HonoType) => {

  app.get('/manager/jobs/:id', async (c) => {
    const id = c.req.param('id');
    const { data, error } = await getItem('jobs', +id);
    
    if (error)
      return c.json({ message: error }, 400);

    if (!data)
      return c.json([]);
    
    const jobResponse: Job = data[0];

    const { data: jobsSkillsData, error: jobsSkillsError, message, status } = await getItem("jobs_skills", +id, 'job_id');

    if (jobsSkillsError) return c.json({ message }, status);

    const jobSkills: JobsSkills[] = jobsSkillsData;
    const jobSkillsIds: number[] = jobSkills.map(jobSkill => jobSkill.skill_id);
    
    const { data: skills, error: skillsError, skillsMessage: skillsMessage, skillsStatus: skillsStatus} = await getItems('skills',jobSkillsIds);

    if (skillsError) return c.json({ message: skillsMessage }, skillsStatus);

    const { data: jobGames, error: jobGamesError, message: jobGamesMessage, status: jobGamesStatus } = await getItem('jobs_games', +id, 'job_id');

    if (jobGamesError) return c.json({ message: jobGamesMessage}, jobGamesStatus);

    const gamesOfJob: JobsGames[] = jobGames;
    const jobGamesIds: number[] = gamesOfJob.map( gameJob => gameJob.game_id);

    const { data: games, error: errorGames, skillsMessage: messageGames, skillsStatus: statusGames } = await getItems('games', jobGamesIds);

    if (errorGames) return c.json({ message: messageGames },statusGames);

    const job: JobResponse = {...jobResponse, skills, games }
    
    return c.json({ data:job }, 200);
      
  });

	app.post('/manager/jobs', async (c) => {
		const body = await c.req.json();

    const { games, skills, ...rest } = body;

    const isValidBody = isValidJob(body);

    if (!isValidBody) return c.json({ message: 'Body is not valid'}, 400);

    const { data, error, status } = await addItemToTable('jobs', rest);
    
    if (error) return c.json({ message: error }, status);

    const job: Job = data[0];

    if (games) {
      const { error: jobsGamesError, status: jobsGamesStatus } = await addRelation('jobs_games',games, job.id ?? 0);
      if (jobsGamesError) return c.json({ message: jobsGamesError }, jobsGamesStatus);
    }

    if (skills) {
      const { error: jobsSkillsError, status: jobsSkillsStatus } = await addRelation('jobs_skills', skills, job.id ?? 0);
      if (jobsSkillsError) return c.json({ message: jobsSkillsError }, jobsSkillsStatus);
    }

    return c.json({ data, error: null, message: 'Job added successfully!!' }, status)
	});

	app.patch('/manager/jobs', async (c) => {
    const body: JobResponse = await c.req.json();

    const { skills, games, ...rest } = body;

    const job: Job = rest;

    const isValidBody = isValidJob(body);
    
		if (!isValidBody) return c.json({ message: 'Body is not valid'}, 400);

    const { data, error, status } = await updateTable('jobs', job);

    if (error) return c.json({ message: error }, status);

    if (games) {
      const { error, status } = await updateRelationTable('jobs_games', job.id, games);

      if (error) return c.json({ error }, status);
    }

    if (skills) {
      const { error, status } = await updateRelationTable('jobs_skills', job.id, skills);
      if (error) return c.json({ error }, status);
    }
    
		return c.json({ data, message: 'Job updated' }, 200);
	});

	app.delete('/manager/jobs/:id', async (c) => {
		const id = c.req.param('id');
    
    const { data, error } = await deleteItem('jobs','id',+id);

    if (error)
      return c.json({ message: error }, 400);

    return c.json({ data, message: 'Job deleted successfully!!' });
	});

}