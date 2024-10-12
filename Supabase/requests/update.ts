import supabase, { Education, Job, Skill, User, Game } from "../index.ts";

export const updateUser = async (user: User) => {
  const { data, error, status } = await supabase
    .from('users')
    .update(user)
    .eq('id', user.id)

    return { data, error, status };
}

export const updateSkill = async (skill: Skill) => {
  const { data, error, status } = await supabase
    .from('skills')
    .update(skill)
    .eq('id', skill.id)

    if (error) return { data: null, message: error.message };

    return { data, error, status };
}

export const updateJob = async (job: Job) => {
  
  const { data, error, status } = await supabase
    .from('jobs')
    .update(job)
    .eq('id', job.id)

    return { data, error, status };
}

export const updateEducation = async (education: Education) => {
  const { data, error, status } = await supabase
    .from('educations')
    .update(education)
    .eq('id', education.id)

    return { data, error, status };
}

export const updateGame = async (game: Game) => {
  const { data, error, status } = await supabase
    .from('games')
    .update(game)
    .eq('id', game.id)

    return { data, error, status };
}