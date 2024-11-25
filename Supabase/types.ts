export type Tables = 'users' | 'skills' | 'jobs' | 'educations' | 'games' | 'games_skills' | 'jobs_skills' | 'jobs_games';

export type Language = 'en' | 'es';

export type HttpMethod = 'PATCH' | 'PUT' | 'DELETE' | 'GET' | 'POST';


export type User = {
  id?: number;
  full_name: string;
  profession: string;
  alias: string;
  email: string;
  linkedin_url: string;
  github_url: string;
  location: string;
  phone_number: string;
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

export type JobResponse = {
  id?: number;
  user_id: number;
  title: string;
  description: string;
  start_date: string;
  end_date: string;
  company: string;
  language: Language;
  company_description?: string;
  location?: string;
  contact?: string;
  logo: string;
  skills?: Skill[];
  games?: Game[];
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
  company_description?: string;
  location?: string;
  contact?: string;
  // games?: Game[];
  // skills?: Skill[];
  logo: CustomFileResponse;
}

export type Skill = {
  id?: number;
  user_id: number;
  name: string;
  type: SkillType;
  language: Language | 'both';
}

export type SkillType = 'hard' | 'soft';

export type EducationResponse = {
  id?: number;
  user_id: number;
  title: string;
  institution: string;
  description: string;
  start_date: Date;
  end_date: Date;
  language: Language;
  location?: string;
  logo: string;
}

export type EducationManager = {
  id?: number;
  user_id: number;
  title: string;
  institution: string;
  description: string;
  start_date: Date;
  end_date: Date;
  language: Language;
  location?: string;
  logo: CustomFileResponse;
}

export type Education = {
  id?: number;
  user_id: number;
  title: string;
  institution: string;
  description: string;
  start_date: string;
  end_date: string;
  language: Language;
  location?: string;
  logo: CustomFileResponse;
}

export type Game = {
  id?: number;
  user_id: number;
  name: string;
  description: string;
  link: string;
  image: CustomFileResponse;
  video?: string;
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
  type: FileType;
}

export type FileType = 'video' | 'image';

export type GamesSkills = {
  id: number;
  game_id: number;
  skill_id: number;
}

export type JobsGames = {
  id: number;
  game_id: number;
  job_id: number;
}

export type JobsSkills = {
  id: number;
  job_id: number;
  skill_id: number;
}