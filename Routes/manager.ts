import { UserRoutes } from "./manager/user/user.ts";
import { JobsRoutes } from "./manager/jobs/jobs.ts";
import { SkillsRoutes } from "./manager/skills/skills.ts";
import { EducationsRoutes } from "./manager/educations/educations.ts";
import { GamesRoutes } from "./manager/games/games.ts";
import { StorageRoutes } from "./manager/storage/storage.ts";
import { HonoType } from "../deps.ts";

export function ManagerRoutes(app: HonoType) {
	UserRoutes(app);
	JobsRoutes(app);
	SkillsRoutes(app);
	EducationsRoutes(app);
	GamesRoutes(app);
	StorageRoutes(app);
}
