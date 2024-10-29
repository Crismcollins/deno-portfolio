import { Relationships } from "../deps.ts";
import db from "./db.ts";
import { Education, Game, Job, Skill, User } from "./Models/index.ts";

const SyncBD = async (recreateTables: boolean) => {
  await db.sync({ drop: recreateTables });
}

const linkModelsToBD = () => {
  const GameSkill = Relationships.manyToMany(Game, Skill);
  const JobSkill = Relationships.manyToMany(Job, Skill);

  db.link([User, Education, Game, Job, Skill, GameSkill, JobSkill]);
}

export const UploadModels = async (recreateTables: boolean = false) => {
  try {
    linkModelsToBD();
    await SyncBD(recreateTables);
    return "OK Models uploaded successfully!!"
  } catch (e) {
    return "ERROR: " + e;
  }
}