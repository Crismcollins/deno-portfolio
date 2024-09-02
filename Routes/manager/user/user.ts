import { Context, Hono } from "https://deno.land/x/hono@v3.4.1/mod.ts";
import { getCrisUser } from "../../../Supabase/requests/get.ts";
import { Language, User } from "../../../Supabase/index.ts";
import { HtmlData } from "../../../htmls/types.ts";
import { baseHtml } from "../../../htmls/index.ts";
import { userParser } from "../../../helpers.ts";
import { updateUser } from "../../../Supabase/requests/update.ts";

export const UserRoutes = (app: Hono) => {

  app.all('/manager/user', async (c: Context) => {
    const formData = await c.req.formData();
    const method = formData.get('_method')?.toString().toUpperCase(); 

    if (method === 'PATCH') {
      const user = userParser(formData);    
		  const response = await updateUser(user);
      return c.json(response);
    }
  
    return c.json({ message: 'Method not allowed' }, 405);
  });

  app.get("/manager/user/:language", async (c) => {
		const language = c.req.param('language');
		const userData = await getCrisUser(language as Language);

		if (!userData) return c.json({ message: "Couldn't get user data" }, 500);

		const user: User = userData[0];

		if (!user) return c.json({ message: 'User not found' }, 404);

		const html = baseHtml({ user } as HtmlData);

		return c.html(html);
	});
}