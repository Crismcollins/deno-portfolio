import { Hono } from "https://deno.land/x/hono@v3.4.1/mod.ts";
import { HtmlData } from "../../../htmls/types.ts";
import { baseHtml } from "../../../htmls/index.ts";
import { jobParser } from "../../../helpers.ts";
import { addJob } from "../../../Supabase/requests/add.ts";
import { updateJob } from "../../../Supabase/requests/update.ts";
import { deleteJob } from "../../../Supabase/requests/delete.ts";
import { getTable } from "../../../Supabase/requests/get.ts";
import { Job, Language } from "../../../Supabase/index.ts";

export const JobsRoutes = (app: Hono) => {
  app.get('/manager/jobs/', async (c) => {
		const { data: jobsData, message: jobsMessage } = await getTable('jobs');

		if (!jobsData) return c.json({ jobsMessage }, 500);

		const jobs: Job[] = jobsData;
		const html = baseHtml({ jobs } as HtmlData)
		return c.html(html);
	});
  app.get('/manager/jobs/:language', async (c) => {
		const language = c.req.param('language');
		const { data: jobsData, message: jobsMessage } = await getTable('jobs', language as Language);

		if (!jobsData) return c.json({ jobsMessage }, 500);

		const jobs: Job[] = jobsData;
    
		const html = baseHtml({ jobs } as HtmlData, language as Language)
		return c.html(html);
	});
	app.post('/manager/jobs', async (c) => {
		const formData = await c.req.formData();
		const newJob = jobParser(formData);

		const response = await addJob(newJob);

		// return c.json(response);
    return c.redirect('/manager/jobs/'+ newJob.language);
	})
	app.patch('/manager/jobs', async (c) => {
		const formData = await c.req.formData();
		const job = jobParser(formData);

		const { data, message } = await updateJob(job);

		if (!data) return c.json({ message }, 500);

		c.redirect('/manager/jobs', 303);
	})
	app.delete('/manager/jobs', async (c) => {
		const formData = await c.req.formData();
		const job = jobParser(formData);

		const { data, message } = await deleteJob(job);

		if (!data) return c.json({ message }, 500);

		c.redirect('/manager/jobs', 303);
	})
}