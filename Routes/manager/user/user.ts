import { Hono } from "https://deno.land/x/hono@v3.4.1/mod.ts";
import { getCrisUser } from "../../../Supabase/requests/get.ts";
import { Language, User } from "../../../Supabase/index.ts";
import { updateUser } from "../../../Supabase/requests/update.ts";
import { isValidUser, userResponseParser } from "../../../helpers.ts";
import { addUser } from "../../../Supabase/requests/add.ts";
import { UserResponse } from "../../../Supabase/types.ts";

export const UserRoutes = (app: Hono) => {

  app.get("/manager/user/:language", async (c) => {
    const language = c.req.param('language');
    const userData = await getCrisUser(language as Language);
    
    if (!userData) return c.json({ message: "Couldn't get user data" }, 500);

    const user: UserResponse = userData[0];
    
    if (!user) return c.json({ message: 'User not found' }, 404);

    const userParsed:User = userResponseParser(user);

    return c.json({ data: userParsed }, 200);
  });

  app.post("/manager/user", async (c) => {
    const body = await c.req.json();

    const isValidBody = isValidUser(body);

    if (!isValidBody) return c.json({ message: 'Body is not valid'}, 400);

    const { message, status } = await addUser(body);

    return c.json({ message }, status)
  });

  app.patch("/manager/user", async (c) => {
    const body = await c.req.json();

    const isValidBody = isValidUser(body);

    if (!isValidBody) return c.json({ message: 'Body is not valid'}, 400);

    const { error: errorUser, status } = await updateUser(body);

    if (errorUser) return c.json({ errorUser }, status);

    return c.json({ message: 'User updated successfully!!' }, 200);

  });
}