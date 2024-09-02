import supabase, { Education, Job, Skill, User } from "../index.ts";

export const deleteUser = async (user: User) => {
  const { data, error } = await supabase
    .from('users')
    .delete()
    .eq('id', user.id)

    if (error) return { data: null, message: error.message};

    return { data, message: 'User deleted successfully!!'};
}

export const deleteSkill = async (skill: Skill) => {
  const { data, error } = await supabase
    .from('skills')
    .delete()
    .eq('id', skill.id)

    if (error) return { data: null, message: error.message};

    return { data, message: 'Skill deleted successfully!!'};
}

export const deleteJob = async (job: Job) => {
  const { data, error } = await supabase
    .from('jobs')
    .delete()
    .eq('id', job.id)

    if (error) return { data: null, message: error.message};

    return { data, message: 'Job deleted successfully!!'};
}

export const deleteEducation = async (education: Education) => {
  const { data, error } = await supabase
    .from('educations')
    .delete()
    .eq('id', education.id)

    if (error) return { data: null, message: error.message};

    return { data, message: 'Education deleted successfully!!'};
}
