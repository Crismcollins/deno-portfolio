import { Hono } from "https://deno.land/x/hono@v3.4.1/mod.ts";

export const SkillsRoutes = (app:Hono) => {
  app.get('/manager/skills/:language', async (c) => {
		
	});
	app.post('/manager/skills', async (c) => {
		
	})
	app.patch('/manager/skills', async (c) => {

	})
	app.delete('/manager/skills', async (c) => {

	})
}