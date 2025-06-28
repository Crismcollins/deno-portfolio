import { arrayBufferToBase64 } from "./helpers.ts";

const IMAGEKIT_API_URL = Deno.env.get("IMAGEKIT_URL") ?? '';
const PRIVATE_API_KEY = Deno.env.get("IMAGEKIT_KEY") ?? '';

const authHeader = "Basic " + btoa(`${PRIVATE_API_KEY}:`);
const baseUrl = `${IMAGEKIT_API_URL}`;

export async function fetchStorage() {    
  const finalUrl = `${baseUrl}?path=/Storage/`;
  
  const response = await fetch(finalUrl, {
    method: "GET",
    headers: {
      Authorization: authHeader,
      Accept: 'application/json',
    },
  });
  
  if (!response.ok) {
    return { data: null, error: response.statusText, status: response.status };
  }
  
  const files = await response.json();
  
  return { data: files, error: null, status: 200 };
}

export async function uploadToStorage(file: File) {
  const finalUrl = `${baseUrl}/upload`;

  const arrayBuffer = await file.arrayBuffer();
  const base64 = arrayBufferToBase64(arrayBuffer);
  const payload = new URLSearchParams();

  payload.append("file", `data:${file.type};base64,${base64}`);
  payload.append("fileName", file.name);
  payload.append("folder", "/Storage");

  const response = await fetch(finalUrl, {
    method: "POST",
    headers: {
      Authorization: authHeader,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: payload.toString(),
  });

  if (!response.ok) {
    return { data: null, error: response.statusText, status: response.status }
  }

  return { data: file, error: null, status: response.status }
}

export async function removeFile(id: string) {
  const finalUrl = `${baseUrl}/${id}`;

  const response = await fetch(finalUrl, {
    method: 'DELETE',
    headers: {
      Authorization: authHeader,
    }
  });

  if (!response.ok) {
    return { data: null, error: response.statusText, status: response.status }
  }

  return { data: id, error: null, status: response.status }
}