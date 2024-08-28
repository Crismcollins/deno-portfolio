import db from "./db.ts";
import { Education, Job, Skill, User } from "./Models/index.ts";

const SyncBD = async (recreateTables: boolean) => {
  // await db.sync();
  await db.sync({ drop: recreateTables });
}

const linkModelsToBD = () => {
  db.link([User, Job, Skill, Education]);
}

export const UploadModels = async (recreateTables: boolean = false) => {
  try {
    linkModelsToBD();
    await SyncBD(recreateTables);
  } catch (e) {
    console.log("ERROR: " + e)
  }
}