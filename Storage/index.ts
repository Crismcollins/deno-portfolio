import { arrayBufferToBase64 } from "./helpers.ts";
import type { Language } from "../Neon/types.ts";

const IMAGEKIT_API_URL = Deno.env.get("IMAGEKIT_URL") ?? '';
const PRIVATE_API_KEY = Deno.env.get("IMAGEKIT_KEY") ?? '';

const authHeader = "Basic " + btoa(`${PRIVATE_API_KEY}:`);
const baseUrl = `${IMAGEKIT_API_URL}`;

type ImageKitFile = {
  name?: string;
  createdAt?: string;
  fileModifiedDate?: string;
  url?: string;
  fileId?: string;
  filePath?: string;
};

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

export async function uploadCV(file: File, fileName: string) {
  const finalUrl = `${baseUrl}/upload`;

  const arrayBuffer = await file.arrayBuffer();
  const base64 = arrayBufferToBase64(arrayBuffer);
  const payload = new URLSearchParams();

  const mimeType = file.type || "application/pdf";
  payload.append("file", `data:${mimeType};base64,${base64}`);
  payload.append("fileName", fileName);
  payload.append("folder", "/CVs");

  const response = await fetch(finalUrl, {
    method: "POST",
    headers: {
      Authorization: authHeader,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: payload.toString(),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    console.error("ImageKit upload error:", response.status, errorBody);
    return { data: null, error: response.statusText, status: response.status }
  }

  const result = await response.json();

  return { data: result, error: null, status: response.status }
}

const extractFileNameFromUrl = (url: string): string => {
  try {
    const pathname = new URL(url).pathname;
    const segments = pathname.split("/");
    return segments[segments.length - 1] || "cv.pdf";
  } catch {
    return "cv.pdf";
  }
};

export async function getLatestCV(language: Language = "en") {
  const finalUrl = `${baseUrl}?path=/CVs/`;

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

  const fileList = Array.isArray(files) ? files : (files.list ?? []);

  const langTag = language.toUpperCase();

  const filtered = fileList.filter((file: ImageKitFile) => {
    const name = file.name ?? "";
    return name.includes(`_${langTag}_`) || name.includes(`_${langTag}.`);
  });

  if (filtered.length === 0) {
    return { data: null, error: `No hay CVs disponibles para el idioma '${language}'`, status: 404 };
  }

  const sorted = filtered.sort((a: ImageKitFile, b: ImageKitFile) => {
    const dateA = new Date(a.createdAt ?? a.fileModifiedDate ?? 0).getTime();
    const dateB = new Date(b.createdAt ?? b.fileModifiedDate ?? 0).getTime();
    return dateB - dateA;
  });

  const latest = sorted[0];
  const fileName = latest.name ?? extractFileNameFromUrl(latest.url);

  return {
    data: {
      url: latest.url,
      fileId: latest.fileId,
      name: fileName,
      filePath: latest.filePath,
    },
    error: null,
    status: 200,
  };
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

/* ------------------------------------------------------------------ */
/*  Límite de versiones de CV por usuario e idioma                     */
/*  Mantiene un máximo de 5 CVs por usuario e idioma.                  */
/*  Si al agregar uno nuevo se superan 5, elimina el más antiguo.     */
/* ------------------------------------------------------------------ */
export async function enforceCvLimit(userName: string, language: Language, maxCv: number = 5) {
  const finalUrl = `${baseUrl}?path=/CVs/`;

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
  const fileList = Array.isArray(files) ? files : (files.list ?? []);

  const langTag = language.toUpperCase();

  const filtered = fileList.filter((file: ImageKitFile) => {
    const name = file.name ?? "";
    return name.includes(`_${userName}_CV_${langTag}_`) || name.includes(`_${userName}_CV_${langTag}.`);
  });

  if (filtered.length < maxCv) {
    return { data: null, error: null, status: 200, deleted: 0 };
  }

  const sorted = filtered.sort((a: ImageKitFile, b: ImageKitFile) => {
    const dateA = new Date(a.createdAt ?? a.fileModifiedDate ?? 0).getTime();
    const dateB = new Date(b.createdAt ?? a.fileModifiedDate ?? 0).getTime();
    return dateA - dateB; // más antiguo primero
  });

  const toDelete = sorted.slice(0, filtered.length - maxCv + 1);

  const deletedIds: string[] = [];
  for (const file of toDelete) {
    if (file.fileId) {
      const del = await removeFile(file.fileId);
      if (!del.error) {
        deletedIds.push(file.fileId);
      }
    }
  }

  return { data: deletedIds, error: null, status: 200, deleted: deletedIds.length };
}