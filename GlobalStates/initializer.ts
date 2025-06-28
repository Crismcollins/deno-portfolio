import { Hono } from "../deps.ts";

export function initializeHono() {
  const app = new Hono();
  return app;
}