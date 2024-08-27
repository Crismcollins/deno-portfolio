import { Hono } from "https://deno.land/x/hono@v3.4.1/mod.ts";

let globalState = {
  googleDriveToken: "",
  appHono: null as Hono | null,
};

export function setGoogleDriveToken(token: string) {
  globalState.googleDriveToken = token;
}

export function getGoogleDriveToken() {
  return globalState.googleDriveToken;
}

export function setAppHono(app: Hono) {
  globalState.appHono = app;
}

export function getAppHono() {
  return globalState.appHono;
}