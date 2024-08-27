import { Hono } from "https://deno.land/x/hono@v3.4.1/mod.ts";

let globalState = {
  googleDriveToken: "",
  appHono: new Hono(),
};

export function setGoogleDriveToken(token: string) {
  globalState.googleDriveToken = token;
}

export function getGoogleDriveToken() {
  return globalState.googleDriveToken;
}

export function setAppHono() {
  globalState.appHono = new Hono();
}

export function getAppHono() {
  return globalState.appHono;
}