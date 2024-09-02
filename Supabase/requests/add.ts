import supabase, { Education, Job, Skill, User } from "../index.ts";

export const addUser = async (user: User) => {
  const { data, error } = await supabase
    .from('users')
    .insert([ user ]);

    if (error) return { data: null, message: error.message};

    return { data, message: 'User added successfully!!'};
}

export const addSkill = async (skill: Skill) => {
  const { data, error } = await supabase
    .from('skills')
    .insert([ skill ]);

    if (error) return { data: null, message:error.message};

    return { data, message: 'Skill added successfully!!'};
}

export const addJob = async (job: Job) => {
  const { error, status, statusText } = await supabase
    .from('jobs')
    .insert([ job ]);

    return { error, status, statusText };
}

export const addEducation = async (education: Education) => {
  const { data, error } = await supabase
    .from('educations')
    .insert([ education ]);

    if (error) return { data: null, message:error.message};

    return { data, message: 'Education added successfully!!'};
}
