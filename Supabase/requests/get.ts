import supabase, { Language, Tables } from "../index.ts";

export const getTable = async (table: Tables, language?: Language) => {
  const query = supabase
      .from(table)
      .select();

  if (language) {
      query.eq('language', language);
  }

  const { data, error } = await query;

  return error ? { data: null, message: error.message} : { data, message: 'Get table sucessfully!!'};
};

export const getCrisUser = async (language: Language = 'en') => {
  const { data, error } = await supabase
  .from('users')
  .select()
  .eq('id', language === 'es' ? 1 : 2)

  if (error) return error.message;

  return data;
}