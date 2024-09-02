import { Hono } from "https://deno.land/x/hono@v3.4.1/mod.ts";

export const EducationsRoutes = (app:Hono) => {
  app.get('/manager/educations/:language', async (c) => {
		
	});
	app.post('/manager/educations', async (c) => {
		
	})
	app.patch('/manager/educations', async (c) => {

	})
	app.delete('/manager/educations', async (c) => {

	})
}