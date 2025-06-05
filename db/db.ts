import { PostgresConnector, Database } from '../deps.ts'
import { requireEnv } from "../helpers.ts";

const connection = new PostgresConnector({
  uri: requireEnv('DATABASE_STRING_CONNECTION'),
});

const db = new Database(connection);

export default db;
