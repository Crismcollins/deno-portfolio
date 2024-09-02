import supabase, { Education, Job, Skill, User } from "../index.ts";

export const updateUser = async (user: User) => {
  const { error, status, statusText } = await supabase
    .from('users')
    .update(user)
    .eq('id', user.id)

    return { error, status, statusText };
}

export const updateSkill = async (skill: Skill) => {
  const { data, error } = await supabase
    .from('skills')
    .update([ skill ])
    .eq('id', skill.id)
    .eq('language', skill.language);

    if (error) return { data: null, message: error.message };

    return { data, message: 'Skill updated successfully!!'};
}

export const updateJob = async (job: Job) => {
  const { data, error } = await supabase
    .from('jobs')
    .update([ job ])
    .eq('id', job.id)
    .eq('language', job.language);

    if (error) return { data: null, message: error.message };

    return { data, message: 'Job updated successfully!!'};
}

export const updateEducation = async (education: Education) => {
  const { data, error } = await supabase
    .from('educations')
    .update([ education ])
    .eq('id', education.id)
    .eq('language', education.language);

    if (error) return { data: null, message: error.message };

    return { data, message: 'Education updated successfully!!'};
}
