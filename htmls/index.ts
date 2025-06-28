import { jobsHtml } from "./jobs.ts";
import { HtmlData } from "./types.ts";
import { UserHtml } from "./user.ts";
import { CreateUserHtml } from "./create-user.ts";
import { Language } from "../Neon/index.ts";
import { Context, Env } from "../deps.ts";

const cssContent = await Deno.readTextFile("htmls/style.css");

export const baseHtml = (data?: HtmlData, language?: Language) => {
  
  return (`
  <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Manage User</title>
      <style>
        ${cssContent}
      </style>
    </head>
  
    <body>
      ${!data ? CreateUserHtml() : ''}
      ${data?.user ? UserHtml(data.user) : ''}
      ${data?.jobs ? jobsHtml(data.jobs, language) : ''}
    </body>
  </html>
  `)
}

export const navbarHtml = (c: Context<Env, "/manager/user">) => `
  <div>
    <button onclick="${c.redirect('/manager/user')}">User</button>
    <button onclick="${c.redirect('/manager/jobs')}">Jobs</button>
  </div>
`