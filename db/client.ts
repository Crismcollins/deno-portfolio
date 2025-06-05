import { Client } from "https://deno.land/x/postgres@v0.14.2/mod.ts";

const client = new Client({
  database: Deno.env.get('DATABASE_NAME'),
  hostname: Deno.env.get('DATABASE_HOST'),
  user: Deno.env.get('DATABASE_USER'),
  password: Deno.env.get('DATABASE_PASSWORD'),
  port: +(Deno.env.get('DATABASE_PORT') ?? 5432),
  tls: {
    enabled: true,
    enforce: true,
  },
});

export default client;