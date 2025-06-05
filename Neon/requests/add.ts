import supabase, { Education, Job, Skill, User } from "../index.ts";
import { Game } from "../types.ts";

export const addUser = async (user: User) => {
  const { data, error, status } = await supabase
    .from('users')
    .insert(user);

    if (error) return { error, message: error.message, status };

    return { data, message: 'User added successfully!!', status};
}

export const addSkill = async (skill: Skill) => {
  const { data, error, status } = await supabase
    .from('skills')
    .insert(skill);

    if (error) return { data: null, message:error.message};

    return { data, message: 'Skill added successfully!!', error, status};
}

export const addJob = async (job: Job) => {
  const { data, error, status } = await supabase
    .from('jobs')
    .insert(job)
    .select('*')

    if (error) return { data: null, message: error.message, status};

    return { data, message: 'Job added successfully!!', error, status };
}

export const addEducation = async (education: Education) => {
  const { data, error, status } = await supabase
    .from('educations')
    .insert(education);

    if (error) return { data: null, message:error.message, status };

    return { data, message: 'Education added successfully!!', error, status };
}

export const addGame = async (game: Game) => {
  const { data, error, status } = await supabase
    .from('games')
    .insert(game)
    .select('id');

    if (error) return { data: null, message:error.message, status };

    return { data: data[0].id, message: 'Game added successfully!!', error, status };
}

export const addGameSkill = async (gameId: number, skillId: number) => {
  const { data, error, status } = await supabase
    .from('games_skills')
    .insert({
      game_id: gameId,
      skill_id: skillId
    });

    if (error) return { data: null, message:error.message, status };

    return { data, message: 'Game added successfully!!', error, status };
}

export const addJobGame = async (games: Game[], job_id: number) => {
    const { data, error, status } = await supabase
    .from('jobs_games')
    .insert(games.map(game => ({ job_id, game_id: game.id })));

    if (error) {
      return { data: null, error, status };
    }

  return { data, error: null, status };
}

export const addJobSkill = async (skills: Skill[], job_id: number) => {
  const { data, error, status } = await supabase
  .from('jobs_skills')
  .insert(skills.map(skill => ({ job_id, skill_id: skill.id })));

  if (error) return { data: null, error, status }

  return { data, error, status }
}