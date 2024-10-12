import supabase, { User } from "../index.ts";

export const deleteUser = async (user: User) => {
  const { data, error } = await supabase
    .from('users')
    .delete()
    .eq('id', user.id)

    if (error) return { data: null, message: error.message };

    return { data, message: 'User deleted successfully!!'};
}

export const deleteSkill = async (id: number) => {
  const { data, error, status } = await supabase
    .from('skills')
    .delete()
    .eq('id', id)

    if (error) return { data: null, message: error.message, status };

    return { data, error, status };
}

export const deleteJob = async (id: number) => {
  const { data, error, status } = await supabase
    .from('jobs')
    .delete()
    .eq('id', id)

    if (error) return { data: null, message: error.message, status };

    return { data, error, status };
}

export const deleteEducation = async (id: number) => {
  const { data, error, status } = await supabase
    .from('educations')
    .delete()
    .eq('id', id)

    if (error) return { data: null, message: error.message, status };

    return { data, error, status };
}

export const deleteGame = async (id: number) => {
  const { data, error, status } = await supabase
    .from('games')
    .delete()
    .eq('id', id)

    if (error) return { data: null, message: error.message, status };

    return { data, error, status };
}