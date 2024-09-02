import { Hono } from "https://deno.land/x/hono@v3.4.1/mod.ts";
import { userParser } from "../../../helpers.ts";
import { addUser } from "../../../Supabase/requests/add.ts";
import { baseHtml } from "../../../htmls/index.ts";

export const CreateUserRoutes = (app: Hono) => {
  
  app.get("/manager/create-user", (c) => {
		const html = baseHtml()
		return c.html(html)
	});

	app.post('/manager/create-user', async (c) => {
		const formData = await c.req.formData();
		const user = userParser(formData);

		const { data, message } = await addUser(user);

		if (!data) return c.json({ message }, 500);

		c.redirect('/manager/create-user', 303);
	});
}