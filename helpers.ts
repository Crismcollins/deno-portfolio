import { Education, Job, Skill, User } from "./Supabase/index.ts";

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

export const jobParser = (job: Job) => {
  const user: Job = {
    user_id: job.user_id ?? 1,
    company: job.company,
    description: job.description,
    end_date: job.end_date,
    start_date: job.start_date,
    title: job.title,
    language: job.language,
  };

  return user;
}

export const isValidJob = (obj: Job): obj is Job => {
  return (
    obj &&
    typeof obj === 'object' &&
    'title' in obj &&
    'company' in obj &&
    'language' in obj &&
    'start_date' in obj &&
    'end_date' in obj &&
    'description' in obj &&
    typeof obj.title === 'string' &&
    typeof obj.company === 'string' &&
    typeof obj.language === 'string' &&
    typeof obj.start_date === 'string' &&
    typeof obj.end_date === 'string' &&
    typeof obj.description === 'string'
  );
};

export const isValidUser = (obj: User): obj is User => {
  return (
    obj &&
    typeof obj === 'object' &&
    'full_name' in obj &&
    'profession' in obj &&
    'alias' in obj &&
    'email' in obj &&
    'linkedin_url' in obj &&
    'about_me' in obj &&
    'study_title' in obj &&
    'language' in obj &&
    typeof obj.full_name === 'string' &&
    typeof obj.profession === 'string' &&
    typeof obj.alias === 'string' &&
    typeof obj.email === 'string' &&
    typeof obj.linkedin_url === 'string' &&
    typeof obj.about_me === 'string' &&
    typeof obj.study_title === 'string' &&
    typeof obj.language === 'string'
  );
};

export const isValidEducation = (obj: Education): obj is Education => {
  return (
    obj &&
    typeof obj === 'object' &&
    'title' in obj &&
    'institution' in obj &&
    'language' in obj &&
    'start_date' in obj &&
    'end_date' in obj &&
    'description' in obj &&
    typeof obj.title === 'string' &&
    typeof obj.institution === 'string' &&
    typeof obj.language === 'string' &&
    typeof obj.start_date === 'string' &&
    typeof obj.end_date === 'string' &&
    typeof obj.description === 'string'
  );
};

export const isValidSkill = (obj: Skill): obj is Skill => {
  return (
    obj &&
    typeof obj === 'object' &&
    'name' in obj &&
    'type' in obj &&
    'language' in obj &&
    typeof obj.name === 'string' &&
    typeof obj.type === 'string' &&
    typeof obj.language === 'string'
  );
};



export const formatDateToDDMMYYYY = (dateString: string): string => {
  const [year, month, day] = dateString.split('-');
  return `${day}-${month}-${year}`;
};

