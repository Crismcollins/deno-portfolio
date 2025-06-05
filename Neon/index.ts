export type { Education, Job, Language, Skill, Tables, User, Game } from "./types.ts";
import { createClient } from "../deps.ts";

const url = Deno.env.get('SUPABASE_URL') ?? '';
const key = Deno.env.get('SUPABASE_KEY') ?? '';

const supabase = createClient(url, key);

export default supabase;