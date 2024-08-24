import { getGoogleDriveToken } from "../GlobalStates/tokenState.ts";
import { GoogleDriveFile, GoogleDriveMimeType } from "./types.ts"

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
  
  const data = responseType === 'text' ? 
                response.text() :
                  responseType === 'binary' ?
                   response.arrayBuffer() :
                    await response.json();
  return data;
}

export const getGoogleDriveStorage = async () => {
  const folderID = Deno.env.get("STORAGE_ID");
  const data = await fetchGoogleDriveData(`/files?q='${folderID}'+in+parents`);
  return data;
}

export const getFileByName = async (imageName: string, mimeTypes?: GoogleDriveMimeType[] | GoogleDriveMimeType) => {
  const folderID = Deno.env.get("STORAGE_ID");
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
