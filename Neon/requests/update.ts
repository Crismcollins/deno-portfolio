import supabase, { Education, Job, Skill, User, Game } from "../index.ts";
import { JobsGames, JobsSkills } from "../types.ts";
import { addJobGame } from "./add.ts";

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

export const updateJob = async (job: Job, games: Game[], skills: Skill[]) => {

  // ADD GAMES
  const { data: jobData, error: jobError, status: jobStatus } = await supabase
    .from('jobs')
    .update(job)
    .eq('id', job.id)

  if (jobError) return { data: null, error: jobError, status: jobStatus };

  const { data: jobGamesData, error: jobGamesError, status: jobGamesStatus } = await supabase
    .from('jobs_games')
    .select('game_id')
    .eq('job_id', job.id)

  if (jobGamesError) return { data: null, error: jobGamesError, status: jobGamesStatus }
  
  const jobGames: JobsGames[] = jobGamesData;
  
  const currentGamesIds = jobGames.map(jobGame => jobGame.game_id);
  
  const gamesToRemove = currentGamesIds.filter((id: number) => !games.some(game => game.id === id));
  
  if (gamesToRemove.length > 0) {
    const { error: removeGameError } = await supabase
      .from('jobs_games')
      .delete()
      .in('game_id', gamesToRemove)
      .eq('job_id', job.id)

    if (removeGameError)
      return { data: null, error: removeGameError, status: removeGameError.code };
  }

  const newGamesIds = games.map(game => game.id)
  const gamesToAdd = newGamesIds.filter(id => !currentGamesIds.includes(id!));

  if (gamesToAdd && gamesToAdd?.length > 0) {
    const { error: addError } = await addJobGame(games, job.id ?? 0);

    if (addError) return { data: null, error: addError, status: addError.code }
  }

  // ADD SKILLS

  const { data: currentSkills, error: skillsError, statusText: skillsStatusText, status: skillsStatus } = await supabase
  .from('jobs_skills')
  .select('skill_id')
  .eq('job_id', job.id);

if (skillsError) return { data: null, error: skillsError, statusText: skillsStatusText, status: skillsStatus };

const currentSkillsIds = currentSkills.map((skill: JobsSkills) => skill.skill_id);

const skillsToRemove = currentSkillsIds.filter( (id: number) => !skills.some(skill => skill.id === id));

if (skillsToRemove.length > 0) {
  const { error: removeError } = await supabase
    .from('jobs_skills')
    .delete()
    .in('skill_id', skillsToRemove)
    .eq('job_id', job.id)

  if (removeError) {
    return { data: null, error: removeError, status: removeError.code };
  }
}

const newSkillsIds = skills.map(skill => skill.id);
const skillsToAdd = newSkillsIds.filter(id => !currentSkillsIds.includes(id));

if (skillsToAdd.length > 0) {
  const { error: addError } = await supabase
    .from('jobs_skills')
    .insert(skillsToAdd.map(skill_id => ({ job_id: job.id, skill_id })));

  if (addError) {
    return { data: null, error: addError, status: addError.code };
  }
}

  return { data: jobData, error: null, status: jobStatus };

}

export const updateEducation = async (education: Education) => {
  const { data, error, status } = await supabase
    .from('educations')
    .update(education)
    .eq('id', education.id)

  return { data, error, status };
}

export const updateGame = async (game: Game, skills: Skill[]) => {
  const { data: gameData, error: gameError, statusText: gameStatusText, status: gameStatus } = await supabase
    .from('games')
    .update(game)
    .eq('id', game.id);

  if (gameError) return { data: null, error: gameError, statusText: gameStatusText, status: gameStatus }

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