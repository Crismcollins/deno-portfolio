import { Relationships } from "../deps.ts";
import client from "./client.ts";
import db from "./db.ts";
import { Education, Game, Job, Skill, User } from "./Models/index.ts";

export const openConnection = async () => {
  await client.connect();
}

export const executeQuery = async (query: string) => {
  const result = await client.queryArray(query);
  return result;
}

export const closeConnection = async () => {
  await client.end();
}

const SyncBD = async (recreateTables: boolean) => {
  await db.sync({ drop: recreateTables });
}

const linkModelsToBD = () => {
  const GameSkill = Relationships.manyToMany(Game, Skill);
  const JobSkill = Relationships.manyToMany(Job, Skill);
  const JobGame = Relationships.manyToMany(Job, Game);

  db.link([User, Education, Game, Job, Skill, GameSkill, JobSkill, JobGame]);
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