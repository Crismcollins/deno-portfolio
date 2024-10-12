import { getGoogleDriveToken } from "../GlobalStates/tokenState.ts";

type ResponseTypes = 'json' | 'text' | 'binary';

export const getGoogleDriveData = async (url: string, responseType: ResponseTypes = 'json') => {

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
    await getGoogleDriveData(url, responseType);
  }

  if (!response) throw new Error(`Error 404: Data not found`);

  const data = responseType === 'text' ?
    response.text() :
    responseType === 'binary' ?
      response.arrayBuffer() :
      await response.json();
  return data;
}
