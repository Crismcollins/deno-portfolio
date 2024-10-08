import supabase, { Language, Tables } from "../index.ts";

export const getTable = async (table: Tables, language?: Language) => {
  const query = supabase
      .from(table)
      .select();

  if (language) {
      query.eq('language', language);
  }

  const response = await query;

  const { data, status, statusText, error  } = response;

  return { data, status, message: statusText, error };
};

export const getItem = async (table: Tables, id: number) => {
  const query = supabase
  .from(table)
  .select()
  .eq('id', id);

const response = await query;

const { data, status, statusText, error  } = response;

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