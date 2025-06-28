import { getItem, getTable } from "../../../Neon/requests/get.ts";
import { isValidEducation } from "../../../helpers.ts";
import { addItemToTable } from "../../../Neon/requests/add.ts";
import { updateTable } from "../../../Neon/requests/update.ts";
import { deleteItem } from "../../../Neon/requests/delete.ts";
import { EducationResponse, Education } from "../../../Neon/types.ts";
import { HonoType, StatusCode } from "../../../deps.ts";

export const EducationsRoutes = (app:HonoType) => {
  app.get('/manager/educations', async (c) => {
		const { data, error, status } = await getTable('educations');
		if (error) return c.json({ message: error.message }, 400);
		console.log(data)
		return c.json({ data }, status as StatusCode);
	});
	app.get('/manager/educations/:id', async (c) => {
		const id = c.req.param('id');
		const { data, error } = await getItem('educations', +id);

		if (error) return c.json({ message: error.message }, 400);

		if (!data) return c.json({ data: {} }, 200);

		const educationResponse: EducationResponse = data[0];

		return c.json({ data: educationResponse }, 200);
	});

	app.post('/manager/educations', async (c) => {
		const body = await c.req.json();
		const isValidBody = isValidEducation(body);

		if (!isValidBody) return c.json({ message: 'Body is not valid'}, 400);

		const { data, error, status } = await addItemToTable('educations', body);

		if (error) return c.json({ message: error }, status);

		return c.json({ data }, 200);
	})
	app.patch('/manager/educations', async (c) => {
		const body = await c.req.json();
		const isValidBody = isValidEducation(body);

		if (!isValidBody) return c.json({ message: 'Body is not valid'}, 400);

		const education: Education = body;

		const { data, error, status } = await updateTable('educations', education);

		if (error) return c.json({ message: error }, status);

		return c.json({ data }, 200);

	})
	app.delete('/manager/educations/:id', async (c) => {
		const id = c.req.param('id');
    
    const { data, error, status } = await deleteItem('educations','id',+id);

    if (error)
      return c.json({ message: error }, status);

    return c.json({ data, message: 'Education deleted successfully!!' });
	})
}