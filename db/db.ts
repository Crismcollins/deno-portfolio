import { PostgresConnector, Database } from '../deps.ts'
import { Education, Job, Skill, User } from "./Models/index.ts";

const connection = new PostgresConnector({
  database: 'portfolio',
  host: 'localhost',
  username: 'crismcollins',
  password: 'asdqwe123',
  port: 5432,
});

const db = new Database(connection);
db.link([User, Job, Skill, Education]);

export default db;
