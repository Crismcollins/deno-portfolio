import { GoogleOAuth } from "https://deno.land/x/google@0.0.8/oauth.ts";
import { getAppHono, getGoogleDriveToken, setGoogleDriveToken } from "../GlobalStates/tokenState.ts";
import { GetLinkAuthorizeApp } from "./google.ts";
import { Files, Folder, FolderContent, GoogleDriveFile, GoogleDriveFolder, GoogleDriveMimeType } from "./types.ts"

type ResponseTypes = 'json' | 'text' | 'binary';

export const fetchGoogleDriveData = async (url: string, responseType: ResponseTypes = 'json') => {

  const googleDriveToken = getGoogleDriveToken();

  const BASE_URL = Deno.env.get("GOOGLE_DRIVE_URL");
  const finalUrl = `${BASE_URL}${url}`;

  const response = await fetch(finalUrl, {
    method: "GET",
    headers: {
      "Authorization": `${googleDriveToken}`,
    },
  });

  if (!googleDriveToken || response.status === 403 || response.status === 401) {
    // await refreshToken();
    await fetchGoogleDriveData(url, responseType); 
  }
  
  if (!response) throw new Error(`Error 404: Data not found`);
  
  const data = responseType === 'text' ? 
                response.text() :
                  responseType === 'binary' ?
                   response.arrayBuffer() :
                    await response.json();
  return data;
}

// const refreshToken = async () => {
//   console.log("WILL REFRESH TOKEN");
//   const { link } = GetLinkAuthorizeApp()
//   const url = 'https://accounts.google.com/o/oauth2/v2/auth'
//   const data = {
//     scope: ["https://www.googleapis.com/auth/drive"],
//     access_type: 'offline',
//     include_granted_scopes: true,
//     redirect_uri: Deno.env.get("REDIRECT_URI") ?? '',
//     client_id: Deno.env.get("CLIENT_ID") ?? '',
//     response_type: 'code',
//     // client_secret: Deno.env.get("CLIENT_SECRET") ?? '',
//   }

//   const response = await fetch(url, {
//     method: "POST",
//     headers: {
//       'Content-Type': 'application/json', // Tipo de contenido
//     },
//     body: JSON.stringify(data),
//   });

//   if (!response.ok) {
//     throw new Error('Error en la solicitud POST');
//   }

//   console.log("TOKEN REFRESHED")
//   setTimeout(() => console.log("ASD"), 999999999999999)
// }

export const getGoogleDriveStorage = async () => {
  const folderID = Deno.env.get("STORAGE_ID");
  const data = await fetchGoogleDriveData(`/files?q='${folderID}'+in+parents`);
  return data;
}

export const getGoogleDriveFolderFiles = async (folderName: GoogleDriveFolder): Promise<Files[]> => {
  const folderID = Folder[folderName];
  const folderContent: FolderContent = await fetchGoogleDriveData(`/files?q='${folderID}'+in+parents`);
  return folderContent.files;
}

export const getIconsFromGoogleDrive = async (): Promise<GoogleDriveFile[]> => {
  const iconsFolder = await getGoogleDriveFolderFiles('icons');
  const folderID = Folder.icons;
  const icons = await Promise.all(iconsFolder.map(async icon => await getFileByName(icon.name, 'image/svg+xml', folderID)));
  return icons;
}

export const getFileByName = async (imageName: string, mimeTypes?: GoogleDriveMimeType[] | GoogleDriveMimeType, folderId?: string) => {
  const folderID = folderId ?? Deno.env.get("STORAGE_ID");
  const mimeTypeArray = Array.isArray(mimeTypes) ? mimeTypes : [mimeTypes];
  const mimeTypeQuery = mimeTypeArray.map(type => `mimeType='${type}'`).join(' or ');
  const query = `name contains '${imageName}' and '${folderID}' in parents` +
                (mimeTypeQuery ? ` and (${mimeTypeQuery})` : '');
  const url = `/files?q=${encodeURIComponent(query)}&fields=files(id,name,mimeType,webContentLink,webViewLink)`;
  const data = await fetchGoogleDriveData(url);
  const file:GoogleDriveFile = data.files[0];
  
  return file;
}

export const getFileById = async(id: string) => {
  const linkDataUrl = `/files/${id}`;
  const linkData = await fetchGoogleDriveData(linkDataUrl);
  return linkData;
}

export const getFileContentById = async(id: string) : Promise<string | null>=> {
  const data = await fetchGoogleDriveData(`/files/${id}?alt=media`, 'text')
  
  if (!data) {
    throw new Error(`Error fetching file content:`);
  }

  return data;
}
