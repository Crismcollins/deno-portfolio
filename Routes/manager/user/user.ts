import { getMyUser } from "../../../Neon/requests/get.ts";
import { Language } from "../../../Neon/index.ts";
import { updateUser } from "../../../Neon/requests/update.ts";
import { isValidUser } from "../../../helpers.ts";
import { UserResponse } from "../../../Neon/types.ts";
import { HonoType } from "../../../deps.ts";

export const UserRoutes = (app: HonoType) => {

  app.get("/manager/user/:language", async (c) => {
    const language = c.req.param('language');
    const userData = await getMyUser(language as Language);
    
    if (!userData) return c.json({ message: "Couldn't get user data" }, 500);

    const user: UserResponse = userData[0];
    
    if (!user) return c.json({ message: 'User not found' }, 404);
    
    return c.json({ data: user }, 200);
  });

  app.post("/manager/user", async (c) => {
    const body = await c.req.json();

    const isValidBody = isValidUser(body);

    if (!isValidBody) return c.json({ message: 'Body is not valid'}, 400);
    
    // const { message, status } = await addUser(body);

    // return c.json({ message }, status)
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