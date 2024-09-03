import { Hono } from "https://deno.land/x/hono@v3.4.1/mod.ts";
import { isValidJob, jobParser } from "../../../helpers.ts";
import { addJob } from "../../../Supabase/requests/add.ts";
import { updateJob } from "../../../Supabase/requests/update.ts";
import { deleteJob } from "../../../Supabase/requests/delete.ts";
import { getItem } from "../../../Supabase/requests/get.ts";

export const JobsRoutes = (app: Hono) => {

  app.get('/manager/jobs/:id', async (c) => {
    const id = c.req.param('id');
    const { data, error } = await getItem('jobs', +id);

    if (error)
    return c.json({ message: error }, 400);

    if (data && data.length < 1)
      return c.json([]);

    if (data)
      return c.json({ data: data[0] });
  });

	app.post('/manager/jobs', async (c) => {
		const body = await c.req.json();
    const isValidBody = isValidJob(body);
    
    if (!isValidBody) return c.json({ message: 'Body is not valid'}, 400);
    
		const newJob = jobParser(body);

		const { data, status, message, error } = await addJob(newJob);

    if (error) return c.json({ message: error }, status);
		
    return c.json({ data, message }, status)
	})
	app.patch('/manager/jobs', async (c) => {
    const body = await c.req.json();
    const isValidBody = isValidJob(body);
    
		if (!isValidBody) return c.json({ message: 'Body is not valid'}, 400);
    
		const { data, status, error } = await updateJob(body);
    
		if (error) return c.json({ message: error.message }, status || 500);
    
		return c.json({ data, message: 'Job updated' }, 200);
	})
	app.delete('/manager/jobs/:id', async (c) => {
		const id = c.req.param('id');
    
    const { data, error } = await deleteJob(+id);

    if (error)
      return c.json({ message: error }, 400);

    return c.json({ data, message: 'Job deleted successfully!!' });
	})
}