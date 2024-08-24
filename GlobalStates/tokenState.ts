let globalState = {
  googleDriveToken: ""
};

export function setGoogleDriveToken(token: string) {
  globalState.googleDriveToken = token;
}

export function getGoogleDriveToken() {
  return globalState.googleDriveToken;
}