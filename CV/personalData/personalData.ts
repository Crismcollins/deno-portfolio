import { getIconsFromGoogleDrive } from "../../GoogleDrive/fetches.ts";
import { IconsObj } from "./types.ts";

const getIcons = async (): Promise<IconsObj> => {
  const icons = await getIconsFromGoogleDrive();

  const iconsObjEmpty: IconsObj = {
    portfolio: "",
    mail: "",
    phone: "",
    location: ""
  };

  const urlIcons = icons.map(icon => ({name: icon.name.slice(0, -4), url: setURL(icon.id)}))

  const iconsObj = urlIcons.reduce((acc: IconsObj, icon) => {
    acc[icon.name as keyof IconsObj] = icon.url;
    return acc;
  }, iconsObjEmpty);
  
  return iconsObj;
}

const setURL = (id: string) => {
  return `https://drive.google.com/thumbnail?id=${id}`;
}

const renderInfo = (urlImage: string, data: string, link?: string) => {

  const ref = link ? `href=${link}` : '';

  return (
    `
      <a class="containerData" ${ref} style="info">
        <div class="imageContainer">
          <img src=${urlImage} width="24" heigth="24"/>
        </div>
        <p>${data}</p>
      </a>
    `
  )
}

const renderPersonalData = async () => {
  
  const { mail, location, phone, portfolio  } = await getIcons();
  
  return `
  <div class="container">
    ${renderInfo(mail, "cris.m.collins@gmail.com", "mailto:cris.m.collins@gmail.com")}
    ${renderInfo(phone, "+56989050986")}
    ${renderInfo(location, "Santiago, Chile")}
    ${renderInfo(portfolio, "crismcollins@github.io", "http://crismcollins.github.io/")}
  </div>
`}

export default renderPersonalData;