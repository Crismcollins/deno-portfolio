import { Education, Job, Skill, User } from "../Neon/index.ts";

export type HtmlData = {
  user: User;
  jobs: Job[];
  skills: Skill[];
  educations: Education[];
}