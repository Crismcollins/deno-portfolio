import { getIconsFromGoogleDrive } from "../../GoogleDrive/fetches.ts";

const renderPersonalData = async () => {
  const icons = await getIconsFromGoogleDrive();
  console.log("jsadklasjdklsajdlkas")
  const email = icons?.find(icon => icon.name.includes('mail'))?.webViewLink;
  const phone = icons?.find(icon => icon.name.includes('phone'))?.webViewLink;
  const location = icons?.find(icon => icon.name.includes('location'))?.webViewLink;
  const portfolio = icons?.find(icon => icon.name.includes('portfolio'))?.webViewLink;
  console.log(email, phone,portfolio,location)
  // <img src="${email}" />
  return `<div style="container">
    <div style="containerData">
      <div style="info">
        
        <p>cris.m.collins@gmail.com</p>
      </div>
    </div>
  </div>
`}

export default renderPersonalData;