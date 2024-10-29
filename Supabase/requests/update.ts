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

export const updateGame = async (game: Game, skills: Skill[]) => {
  const { data: gameData, error: gameError,  statusText: gameStatusText, status: gameStatus } = await supabase
    .from('games')
    .update(game)
    .eq('id', game.id);

  if (gameError) return { data:null, error: gameError, statusText: gameStatusText, status: gameStatus }
  
  const { data: currentSkills, error: skillsError, statusText: skillsStatusText, status: skillsStatus } = await supabase
  .from('games_skills')
  .select('skill_id')
  .eq('game_id', game.id);

  if (skillsError) return { data: null, error: skillsError, statusText: skillsStatusText, status: skillsStatus };
  
  const currentSkillsIds = currentSkills.map(skill => skill.skill_id);

  const skillsToRemove = currentSkillsIds.filter(id => !skills.some(skill => skill.id === id));

  if (skillsToRemove.length > 0) {
    const { error: removeError } = await supabase
    .from('games_skills')
    .delete()
    .in('skill_id', skillsToRemove)
    .eq('game_id', game.id)

    if (removeError) {
      return { data: null, error: removeError, status: removeError.code };
    }
  }

  const newSkillsIds = skills.map(skill => skill.id);
  const skillsToAdd = newSkillsIds.filter(id => !currentSkillsIds.includes(id));

  if (skillsToAdd.length > 0) {
    const { error: addError } = await supabase
    .from('games_skills')
    .insert(skillsToAdd.map(skill_id => ({ game_id: game.id, skill_id })));

    if (addError) {
      return { data: null, error: addError, status: addError.code };
    }
  }

  return { data: gameData, error: null, status: gameStatus };
}