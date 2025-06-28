export type { Education, Job, Language, Skill, Tables, User, Game } from "./types.ts";

import { neon } from "../deps.ts";
import { requireEnv } from "../helpers.ts";

const url = requireEnv('DATABASE_STRING_CONNECTION');

const sql = neon(url);

export default sql;