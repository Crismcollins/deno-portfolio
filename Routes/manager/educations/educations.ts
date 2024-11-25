import { Hono } from "https://deno.land/x/hono@v3.4.1/mod.ts";
import { getItem, getTable } from "../../../Supabase/requests/get.ts";
import { educationResponseParser, isValidEducation } from "../../../helpers.ts";
import { addEducation } from "../../../Supabase/requests/add.ts";
import { updateEducation } from "../../../Supabase/requests/update.ts";
import { deleteEducation } from "../../../Supabase/requests/delete.ts";
import { CustomFileResponse, Education, EducationManager, EducationResponse } from "../../../Supabase/types.ts";

export const EducationsRoutes = (app:Hono) => {
  app.get('/manager/educations', async (c) => {
		const { data, error, status } = await getTable('educations');
		if (error) return c.json({ message: error.message }, 400);
		
		return c.json({ data }, status);
	});
	app.get('/manager/educations/:id', async (c) => {
		const id = c.req.param('id');
		const { data, error } = await getItem('educations', +id);

		if (error) return c.json({ message: error.message }, 400);

		if (!data) return c.json({ data: {} }, 200);

		const educationResponse: EducationResponse = data[0];
		// const education: Education = educationResponseParser(educationResponse);
		const education: EducationManager = {
			...educationResponse,
			logo: JSON.parse(educationResponse.logo)
		}
		

		return c.json({ data: education }, 200);
	});

	app.post('/manager/educations', async (c) => {
		const body = await c.req.json();
		const isValidBody = isValidEducation(body);

		if (!isValidBody) return c.json({ message: 'Body is not valid'}, 400);

		const { data, error, status } = await addEducation(body);

		if (error) return c.json({ message: error }, status);

		return c.json({ data }, 200);
	})
	app.patch('/manager/educations', async (c) => {
		const body = await c.req.json();
		const isValidBody = isValidEducation(body);

		if (!isValidBody) return c.json({ message: 'Body is not valid'}, 400);

		const { data, error, status } = await updateEducation(body);

		if (error) return c.json({ message: error }, status);

		return c.json({ data }, 200);

	})
	app.delete('/manager/educations/:id', async (c) => {
		const id = c.req.param('id');
    
    const { data, error, status } = await deleteEducation(+id);

    if (error)
      return c.json({ message: error }, status);

    return c.json({ data, message: 'Education deleted successfully!!' });
	})
}