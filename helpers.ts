
import { Education, Job, Skill, User } from "./Neon/index.ts";
import { Game } from "./Neon/types.ts";

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
    'image' in obj &&
    'about_me' in obj &&
    'study_title' in obj &&
    'language' in obj &&
    typeof obj.full_name === 'string' &&
    typeof obj.profession === 'string' &&
    typeof obj.alias === 'string' &&
    typeof obj.email === 'string' &&
    typeof obj.linkedin_url === 'string' &&
    typeof obj.image === 'string' &&
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
    typeof obj.title === 'string' &&
    typeof obj.institution === 'string' &&
    typeof obj.language === 'string' &&
    typeof obj.start_date === 'string' &&
    typeof obj.end_date === 'string'
  );
};

export const isValidGame = (obj: Game): obj is Game => {
  return (
    obj &&
    typeof obj === 'object' &&
    'user_id' in obj &&
    'name' in obj &&
    'description' in obj &&
    'link' in obj &&
    'image' in obj &&
    'background' in obj &&
    'language' in obj &&
    typeof obj.user_id === 'number' &&
    typeof obj.name === 'string' &&
    typeof obj.description === 'string' &&
    typeof obj.background === 'string' &&
    typeof obj.image === 'string' &&
    (obj.language === 'en' || obj.language === 'es')
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

export function convertToEmbedUrl(url: string): string | null {
  const videoIdMatch = url.match(/(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([^&]+)/);

  if (videoIdMatch && videoIdMatch[1]) {
    const videoId = videoIdMatch[1];
    return `https://www.youtube.com/embed/${videoId}`;
  }
  
  return url;
}

export function requireEnv(name: string | undefined): string {
  if (!name) throw new Error(`Missing name var: ${name}`);
  const value = Deno.env.get(name);
  if (!value) throw new Error(`Missing env var: ${name}`);
  return value;
}
