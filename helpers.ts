import { Job, User } from "./Supabase/index.ts";

export async function getFileContent(filePath: string): Promise<string> {
  try {
    const content = await Deno.readTextFile(filePath);
    return content;
  } catch (error) {
    console.error(`Error reading file ${filePath}:`, error);
    throw error;
  }
}

export const userParser = (formData: FormData) => {
  const user: User = {
    id: +(formData.get('id') ?? 1) as number, 
    full_name: formData.get('full_name') as string,
    profession: formData.get('profession') as string,
    alias: formData.get('alias') as string,
    email: formData.get('email') as string,
    linkedin_url: formData.get('linkedin_url') as string,
    about_me: formData.get('about_me') as string,
    study_title: formData.get('study_title') as string,
    language: (formData.get('language') as 'es' | 'en') || 'en',
  };

  return user;
}

export const jobParser = (formData: FormData) => {
  formatDateToDDMMYYYY
  const start_date = formData.get('start_date') as string;
  const end_date = formData.get('end_date') as string;
  const language = (formData.get('language') as 'es' | 'en') || 'en';

  const user: Job = {
    user_id: 1,
    company: formData.get('company') as string,
    description: formData.get('description') as string,
    end_date,
    start_date,
    title: formData.get('title') as string,
    language: language,
  };

  return user;
}

export const formatDateToDDMMYYYY = (dateString: string): string => {
  const [year, month, day] = dateString.split('-');
  return `${day}-${month}-${year}`;
};

