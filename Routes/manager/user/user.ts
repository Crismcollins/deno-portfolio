import { Hono } from "https://deno.land/x/hono@v3.4.1/mod.ts";
import { getCrisUser } from "../../../Supabase/requests/get.ts";
import { Language, User } from "../../../Supabase/index.ts";
import { updateUser } from "../../../Supabase/requests/update.ts";
import { isValidUser } from "../../../helpers.ts";

export const UserRoutes = (app: Hono) => {

  app.get("/manager/user/:language", async (c) => {
		const language = c.req.param('language');
		const userData = await getCrisUser(language as Language);

		if (!userData) return c.json({ message: "Couldn't get user data" }, 500);

		const user: User = userData[0];

		if (!user) return c.json({ message: 'User not found' }, 404);

		return c.json({ data:user }, 200);
	});

  app.patch("/manager/user", async (c) => {
    const body = await c.req.json();

    const bodyIsValid = isValidUser(body);

    if (!bodyIsValid) return c.json({ message: 'Body is not valid'}, 400);

    const { data, error } = await updateUser(body);

    return c.json({ data, error }, 200)
  })

}
