import { Hono } from "https://deno.land/x/hono@v3.4.1/mod.ts";
import { UserRoutes } from "./manager/user/user.ts";
import { JobsRoutes } from "./manager/jobs/jobs.ts";
import { SkillsRoutes } from "./manager/skills/skills.ts";
import { EducationsRoutes } from "./manager/educations/educations.ts";
import { GamesRoutes } from "./manager/games/games.ts";
import { StorageRoutes } from "./manager/storage/storage.ts";

export function ManagerRoutes(app: Hono) {
	UserRoutes(app);
	JobsRoutes(app);
	SkillsRoutes(app);
	EducationsRoutes(app);
	GamesRoutes(app);
	StorageRoutes(app);
}
