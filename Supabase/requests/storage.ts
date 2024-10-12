import supabase from "../index.ts";

export const addImageToStorage = async (file: File) => {
  const { data, error } = await supabase
    .storage
    .from('portfolio-storage')
    .upload(`images/${file.name}`, file, {
      contentType: file.type,
    })

  return { data, error }
}

export const getImageLink = async (url: string) => {
  const image = await supabase
    .storage
    .from('portfolio-storage')
    .getPublicUrl(url);

  return image.data.publicUrl;
}

export const getImageLinkByName = async (imageName: string) => {
  const { data } = await supabase
    .storage
    .from('portfolio-storage')
    .getPublicUrl(`images/${imageName}`)

  return { data }
}

export const getImages = async () => {
  const { data, error } = await supabase
  .storage
  .from('portfolio-storage')
  .list('images');

return { data, error }
}

export const getImageByName = async (imageName: string) => {
  const { data, error } = await supabase
    .storage
    .from('portfolio-storage')
    .list('images', { search: imageName });

  return { data, error }
}

export const deleteImageByUrl = async (publicUrl: string) => {

  const filePath = decodeURIComponent(publicUrl.split('/portfolio-storage/')[1]);
  
  const { data, error } = await supabase
  .storage
  .from('portfolio-storage')
  .remove([filePath]);

  return { data, error }
}

export const deleteImageByName = async (name: string) => {

  const filePath = `images/${name}`;
  
  const { data, error } = await supabase
  .storage
  .from('portfolio-storage')
  .remove([filePath]);

  return { data, error }
}