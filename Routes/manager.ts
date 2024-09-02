import { Hono } from "https://deno.land/x/hono@v3.4.1/mod.ts";
import { validateLanguage } from "./middlewares.ts";
import { UserRoutes } from "./manager/user/user.ts";
import { JobsRoutes } from "./manager/jobs/jobs.ts";
import { CreateUserRoutes } from "./manager/create-user/create-user.ts";
import { SkillsRoutes } from "./manager/skills/skills.ts";
import { EducationsRoutes } from "./manager/educations/educations.ts";

export function ManagerRoutes(app: Hono) {

	app.use('/manager/user/:language',validateLanguage);
	app.use('/manager/jobs/:language',validateLanguage);

	CreateUserRoutes(app);
	UserRoutes(app);
	JobsRoutes(app);
	SkillsRoutes(app);
	EducationsRoutes(app);
}
