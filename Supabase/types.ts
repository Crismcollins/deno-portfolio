export type Tables = 'users' | 'skills' | 'jobs' | 'educations' | 'games';

export type Language = 'en' | 'es';

export type HttpMethod = 'PATCH' | 'PUT' | 'DELETE' | 'GET' | 'POST';


export type User = {
  id?: number;
  full_name: string;
  profession: string;
  alias: string;
  email: string;
  linkedin_url: string;
  about_me: string;
  image: CustomFileResponse;
  study_title: string;
  language: Language;
}

export type UserResponse = {
  id?: number;
  full_name: string;
  profession: string;
  alias: string;
  email: string;
  linkedin_url: string;
  about_me: string;
  image: string;
  study_title: string;
  language: Language;
}

export type Job = {
  id?: number;
  user_id: number;
  title: string;
  description: string;
  start_date: string;
  end_date: string;
  company: string;
  language: Language;
}

export type Skill = {
  id?: number;
  user_id: number;
  name: string;
  type: SkillType;
  language: Language;
}

export type SkillType = 'hard' | 'soft';

export type Education = {
  id?: number;
  user_id: number;
  title: string;
  institution: string;
  description: string;
  start_date: Date;
  end_date: Date;
  language: Language;
}

export type Game = {
  id?: number;
  user_id: number;
  name: string;
  description: string;
  link: string;
  image: CustomFileResponse;
  background: CustomFileResponse;
  duration: string;
  language: Language;
}

export type GameResponse = {
  id?: number;
  user_id: number;
  name: string;
  description: string;
  link: string;
  image: string;
  background: string;
  duration: string;
  language: Language;
}

export type SupabaseError = {
  statusCode: string;
  error: string;
  message: string;
} | null;

export type CustomFileResponse = {
  id: string;
  name: string;
  url: string;
}