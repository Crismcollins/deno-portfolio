import { Education, Job, Skill, User } from "../Supabase/index.ts";

export type HtmlData = {
  user: User;
  jobs: Job[];
  skills: Skill[];
  educations: Education[];
}