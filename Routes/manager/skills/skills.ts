import { Hono } from "https://deno.land/x/hono@v3.4.1/mod.ts";
import { getItem, getTable } from "../../../Supabase/requests/get.ts";
import { isValidSkill } from "../../../helpers.ts";
import { addSkill } from "../../../Supabase/requests/add.ts";
import { updateSkill } from "../../../Supabase/requests/update.ts";
import { deleteSkill } from "../../../Supabase/requests/delete.ts";

export const SkillsRoutes = (app:Hono) => {
  app.get('/manager/skills', async (c) => {
		const { data, error} = await getTable('skills');

		if (error)
			return c.json({ message: error }, 400);

			if (data && data.length < 1)
      return c.json([]);

    if (data)
      return c.json({data});
	});
	app.get('/manager/skills/:id', async (c) => {
		const id = c.req.param('id');
    const { data, error } = await getItem('skills', +id);

    if (error)
    return c.json({ message: error }, 400);

    if (data && data.length < 1)
      return c.json([]);

    if (data)
      return c.json({ data: data[0] });
	});
	app.post('/manager/skills', async (c) => {
		const body = await c.req.json();
		const isValidBody = isValidSkill(body);
    
    if (!isValidBody) return c.json({ message: 'Body is not valid'}, 400);

		const { data, error, status } = await addSkill(body);
		
		if (error) return c.json({ message: error }, status);
		
		return c.json({ data }, 200);
	});
	
	app.patch('/manager/skills', async (c) => {
		const body = await c.req.json();
		const isValidBody = isValidSkill(body);
		
		if (!isValidBody) return c.json({ message: 'Body is not valid'}, 400);

		const { data, error, status } = await updateSkill(body);

		if (error) return c.json({ message: error }, status);

		return c.json({ data }, 200);
	})
	app.delete('/manager/skills/:id', async (c) => {
		const id = c.req.param('id');
    
    const { data, error, status } = await deleteSkill(+id);

    if (error)
      return c.json({ message: error }, status);

    return c.json({ data, message: 'Skill deleted successfully!!' });
	})
}