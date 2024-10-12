import { getGoogleDriveData } from "./fetches.ts";
import { GetLinkAuthorizeApp } from "./google.ts";
import { Files, Folder, FolderContent, GoogleDriveFile, GoogleDriveFolder, GoogleDriveMimeType } from "./types.ts"

export const getGoogleDriveStorage = async () => {
  const folderID = Deno.env.get("STORAGE_ID");
  const data = await getGoogleDriveData(`/files?q='${folderID}'+in+parents`);
  return data;
}

export const getGoogleDriveFolderFiles = async (folderName: GoogleDriveFolder): Promise<Files[]> => {
  const folderID = Folder[folderName];
  const folderContent: FolderContent = await getGoogleDriveData(`/files?q='${folderID}'+in+parents`);
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
  const data = await getGoogleDriveData(url);
  const file:GoogleDriveFile = data.files[0];
  return file;
}

export const getFileById = async(id: string) => {
  const linkDataUrl = `/files/${id}`;
  const linkData = await getGoogleDriveData(linkDataUrl);
  return linkData;
}

export const getFileContentById = async(id: string) : Promise<string | null>=> {
  const data = await getGoogleDriveData(`/files/${id}?alt=media`, 'text')
  
  if (!data) {
    throw new Error(`Error fetching file content:`);
  }

  return data;
}

export const refreshToken = async () => {
  const { link } = GetLinkAuthorizeApp()
  
  const response = await fetch(link, {
    method: "POST",
  });
  
  const htmlResponse = await response.text();
  return htmlResponse;
}