import supabase, { Language, Tables } from "../index.ts";
import { GamesSkills, JobsGames, JobsSkills } from "../types.ts";

export const getTable = async (table: Tables, language?: Language) => {
  const query = supabase
    .from(table)
    .select()
    .order('id', { ascending: true });

  if (language) {
    query.eq('language', language);
  }

  const response = await query;

  const { data, status, statusText, error } = response;

  return { data, status, message: statusText, error };
};

export const getItem = async (table: Tables, id: number) => {
  const query = supabase
    .from(table)
    .select()
    .eq('id', id);

  const response = await query;

  const { data, status, statusText, error } = response;

  return { data, status, message: statusText, error };
}

export const getCrisUser = async (language: Language = 'en') => {
  const { data, error } = await supabase
    .from('users')
    .select()
    .eq('id', language === 'es' ? 1 : 2)

  if (error) return error.message;

  return data;
}

export const getGameSkillById = async (gameId: number) => {
  const { data, error } = await supabase
    .from('games_skills')
    .select()
    .eq('game_id', gameId);

  if (error) return { data: null, message: error.message, status: error.code };

  return { data: data as GamesSkills[], message: 'Game skills got successfully!!', error, status: 200 };
}

export const getJobGameById = async (jobId: number) => {
  const { data, error } = await supabase
    .from('jobs_games')
    .select()
    .eq('job_id', jobId);

  if (error) return { data: null, message: error.message, status: error.code }

  return { data: data as JobsGames[], message: null, error, status: 200 }
}

export const getJobSkillById = async (jobId: number) => {
  const { data, error } = await supabase
    .from('jobs_skills')
    .select()
    .eq('job_id', jobId);

  if (error) return { data: null, message: error.message, status: error.code }

  return { data: data as JobsSkills[], message: null, error, status: 200 }
}
