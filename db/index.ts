import db from "./db.ts";
import { Education, Game, Job, Skill, User } from "./Models/index.ts";

const SyncBD = async (recreateTables: boolean) => {
  await db.sync({ drop: recreateTables });
}

const linkModelsToBD = () => {
  db.link([User, Job, Skill, Education, Game]);
}

export const UploadModels = async (recreateTables: boolean = false) => {
  try {
    linkModelsToBD();
    await SyncBD(recreateTables);
    console.log("Models uploaded successfully!!")
  } catch (e) {
    console.log("ERROR: " + e)
  }
}