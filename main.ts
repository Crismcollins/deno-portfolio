import { Hono } from "https://deno.land/x/hono@v3.4.1/mod.ts";
import { readData } from "./helpers.ts";

const app = new Hono();

app.get("/", (c) => c.redirect("/file"));

app.get("/file", async (c) => {
  const data = await readData();
  return c.json(data);
});


Deno.serve(app.fetch);
