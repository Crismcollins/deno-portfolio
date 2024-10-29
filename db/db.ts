import { PostgresConnector, Database } from '../deps.ts'

const connection = new PostgresConnector({
  database: Deno.env.get('DATABASE_NAME') ?? '',
  host: Deno.env.get('DATABASE_HOST') ?? '',
  username: Deno.env.get('DATABASE_USER') ?? '',
  password: Deno.env.get('DATABASE_PASSWORD') ?? '',
  port: +(Deno.env.get('DATABASE_PORT') ?? 5432),
});

const db = new Database(connection);

export default db;
