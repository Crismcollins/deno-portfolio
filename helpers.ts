
import { Education, Job, Skill, User } from "./Supabase/index.ts";
import { deleteImageByUrl } from "./Supabase/requests/storage.ts";
import { CustomFileResponse, Game, Tables, GameResponse, UserResponse, JobResponse, EducationResponse, JobsGames, JobsSkills } from "./Supabase/types.ts";
import { getGameSkillById, getItem, getJobGameById, getJobSkillById, getTable } from "./Supabase/requests/get.ts";
import db from "./db/db.ts";

export async function getFileContent(filePath: string): Promise<string> {
  try {
    const content = await Deno.readTextFile(filePath);
    return content;
  } catch (error) {
    console.error(`Error reading file ${filePath}:`, error);
    throw error;
  }
}

export const isValidJob = (obj: Job): obj is Job => {
  return (
    obj &&
    typeof obj === 'object' &&
    'title' in obj &&
    'company' in obj &&
    'language' in obj &&
    'start_date' in obj &&
    'end_date' in obj &&
    'description' in obj &&
    typeof obj.title === 'string' &&
    typeof obj.company === 'string' &&
    typeof obj.language === 'string' &&
    typeof obj.start_date === 'string' &&
    typeof obj.end_date === 'string' &&
    typeof obj.description === 'string'
  );
};

export const isValidUser = (obj: User): obj is User => {
  return (
    obj &&
    typeof obj === 'object' &&
    'full_name' in obj &&
    'profession' in obj &&
    'alias' in obj &&
    'email' in obj &&
    'linkedin_url' in obj &&
    'image' in obj &&
    'about_me' in obj &&
    'study_title' in obj &&
    'language' in obj &&
    typeof obj.full_name === 'string' &&
    typeof obj.profession === 'string' &&
    typeof obj.alias === 'string' &&
    typeof obj.email === 'string' &&
    typeof obj.linkedin_url === 'string' &&
    isValidCustomFileResponse(obj.image) &&
    typeof obj.about_me === 'string' &&
    typeof obj.study_title === 'string' &&
    typeof obj.language === 'string'
  );
};

export const isValidEducation = (obj: Education): obj is Education => {
  return (
    obj &&
    typeof obj === 'object' &&
    'title' in obj &&
    'institution' in obj &&
    'language' in obj &&
    'start_date' in obj &&
    'end_date' in obj &&
    typeof obj.title === 'string' &&
    typeof obj.institution === 'string' &&
    typeof obj.language === 'string' &&
    typeof obj.start_date === 'string' &&
    typeof obj.end_date === 'string'
  );
};

export const isValidGame = (obj: Game): obj is Game => {
  return (
    obj &&
    typeof obj === 'object' &&
    'user_id' in obj &&
    'name' in obj &&
    'description' in obj &&
    'link' in obj &&
    'image' in obj &&
    'background' in obj &&
    'duration' in obj &&
    'language' in obj &&
    typeof obj.user_id === 'number' &&
    typeof obj.name === 'string' &&
    typeof obj.description === 'string' &&
    typeof obj.link === 'string' &&
    isValidCustomFileResponse(obj.image) &&
    isValidCustomFileResponse(obj.background) &&
    typeof obj.duration === 'string' &&
    (obj.language === 'en' || obj.language === 'es')
  );
};

export const isValidCustomFileResponse = (file: CustomFileResponse): file is CustomFileResponse => {
  return (
    file &&
    typeof file === 'object' &&
    'id' in file &&
    'name' in file &&
    'url' in file &&
    typeof file.id === 'string' &&
    typeof file.name === 'string' &&
    typeof file.url === 'string'
  );
};


export const isValidSkill = (obj: Skill): obj is Skill => {
  return (
    obj &&
    typeof obj === 'object' &&
    'name' in obj &&
    'type' in obj &&
    'language' in obj &&
    typeof obj.name === 'string' &&
    typeof obj.type === 'string' &&
    typeof obj.language === 'string'
  );
};

export const formatDateToDDMMYYYY = (dateString: string): string => {
  const [year, month, day] = dateString.split('-');
  return `${day}-${month}-${year}`;
};

export const formatDate = (dateString: string): { MMYY: string; YYMM: string } => {
  const date = new Date(dateString);

  const MMYY = `${String(date.getMonth() + 1).padStart(2, '0')}/${String(date.getFullYear())}`;
  const YYMM = `${String(date.getFullYear())}/${String(date.getMonth() + 1).padStart(2, '0')}`;

  return { MMYY, YYMM };
};

export const gameListResponseParser = (games: GameResponse[]): Game[] => {
  return games.map(game => {
    return {
      ...game,
      image: game.image ? JSON.parse(game.image) : null,  // Maneja undefined o JSON inválido
      background: game.background ? JSON.parse(game.background) : null  // Maneja undefined o JSON inválido
    };
  });
}

export const jobListResponseParser = async (jobs: JobResponse[]): Promise<Job[]> => {
  const parsedJobs = await Promise.all(
    jobs.map(async (job) => {
      const { MMYY: start_date_es, YYMM: start_date_en } = formatDate(job.start_date);
      const { MMYY: end_date_es, YYMM: end_date_en } = formatDate(job.end_date);

      const { data: jobGameData, error: jobGameError, status: jobGameStatus } = await jobGamesParser(job);

      if (jobGameError) throw new Error(`${jobGameError} STATUS: ${jobGameStatus}`);

      const { data: jobs, error: jobError, status: jobStatus } = await jobSkillParser(jobGameData ?? job);

      if (jobError) throw new Error(`${jobError} STATUS: ${jobStatus}`)

      return {
        ...job,
        start_date: job.language === 'en' ? start_date_en : start_date_es,
        end_date: job.language === 'en' ? end_date_en : end_date_es,
        logo: job.logo ? JSON.parse(job.logo) : null,
        skills: jobs.skills,
        games: jobs.games
      };
    })
  );

  return parsedJobs;
};

export const jobResponseParser = (job: JobResponse): Job => {
  const { MMYY: start_date_es, YYMM: start_date_en } = formatDate(job.start_date);
  const { MMYY: end_date_es, YYMM: end_date_en } = formatDate(job.end_date);

  return {
    ...job,
    start_date: job.language === 'en' ? start_date_en : start_date_es,
    end_date: job.language === 'en' ? end_date_en : end_date_es,
    logo: job.logo ? JSON.parse(job.logo) : null,
  }
}

export const jobGamesParser = async (job: JobResponse) => {
  const { data: jobsGamesData, error: jobsGamesError, status: jobsGamesStatus } = await getJobGameById(job.id ?? 0);

  if (jobsGamesError) return { message: jobsGamesError, status: jobsGamesStatus }

  const jobsGames: JobsGames[] = jobsGamesData!;

  const gamesList: GameResponse[] = await Promise.all(jobsGames.map(async (jobGame) => {
    const { data, error, status } = await getItem('games', jobGame.game_id);

    if (error) return { message: error, status }

    return data[0];
  }))

  const games = gamesList.map(game => ({ ...game, image: JSON.parse(game.image), background: JSON.parse(game.background) }))

  const jobReponse: JobResponse = { ...job, games: games, logo: JSON.parse(job.logo) };

  return { data: jobReponse, error: null, status: 200 };
}

export const jobSkillParser = async (job: JobResponse) => {
  const { data: jobsSkillsData, error: jobsSkillsError, status: jobsSkillsStatus } = await getJobSkillById(job.id ?? 0);

  if (jobsSkillsError) return { error: jobsSkillsError, status: jobsSkillsStatus }

  const jobsSkills: JobsSkills[] = jobsSkillsData!;

  const skillsList: Skill[] = await Promise.all(jobsSkills.map(async (jobSkill) => {
    const { data, error, status } = await getItem('skills', jobSkill.skill_id);

    if (error) return { message: error, status }

    return data[0];
  }))

  const jobResponse: JobResponse = { ...job, skills: skillsList }

  return { data: jobResponse, error: null, status: 200 }
}

export const educationListResponseParser = (educations: EducationResponse[]): Education[] =>
  educations.map(education => {
    const { MMYY: start_date_es, YYMM: start_date_en } = formatDate(education.start_date.toString());
    const { MMYY: end_date_es, YYMM: end_date_en } = formatDate(education.end_date.toString());

    return {
      ...education,
      start_date: education.language === 'en' ? start_date_en : start_date_es,
      end_date: education.language === 'en' ? end_date_en : end_date_es,
      logo: education.logo ? JSON.parse(education.logo) : null,
    }
  })

export const educationResponseParser = (education: EducationResponse): Education => {
  const { MMYY: start_date_es, YYMM: start_date_en } = formatDate(education.start_date.toString());
  const { MMYY: end_date_es, YYMM: end_date_en } = formatDate(education.end_date.toString());

  return {
    ...education,
    start_date: education.language === 'en' ? start_date_en : start_date_es,
    end_date: education.language === 'en' ? end_date_en : end_date_es,
    logo: education.logo ? JSON.parse(education.logo) : null
  }
}

export const gameResponseParser = async (game: GameResponse) => {
  const { data, message, status, error } = await getGameSkillById(game.id!);

  if (error) return { error, message, status }

  if (!data) return { ...game, image: JSON.parse(game.image), background: JSON.parse(game.background), skills: [] };

  const skills = await Promise.all(data.map(async (gameskill) => {
    try {
      const { data, error } = await getItem('skills', gameskill.skill_id);

      if (error) throw new Error(error.message);
      if (!data) return undefined;

      return data[0];
    } catch (e) {
      return { data: null, error: e }
    }
  }));


  return { data: { ...game, image: JSON.parse(game.image), background: JSON.parse(game.background), skills }, error };
}

export const userResponseParser = (user: UserResponse): User => {
  return { ...user, image: JSON.parse(user.image) };
}

export const renameFile = (file: File, newName: string): File => {
  const extension = file.name.split('.').pop();
  const newFileName = `${newName}.${extension}`;
  return new File([file], newFileName, { type: file.type });
}

export const encodeFileName = (file: File): File => {
  const newName = sanitizeFileName(file.name);
  return new File([file], encodeURIComponent(newName), { type: file.type });
}

export const sanitizeFileName = (fileName: string) => {
  return fileName.replace(/[^a-zA-Z0-9-_\.]/g, '_'); // Reemplaza caracteres no permitidos
};

export const deleteImagesInStorage = async (id: number, table: Tables) => {
  let errorMethod = null;

  const { data, error, message, status } = await getItem(table, id);

  if (error) {
    errorMethod = { error, message, status }
    return { error: errorMethod, status }
  }

  if (!data) {
    errorMethod = { error: "id or table doesn't exist", message: 'not found' }
    return { error: errorMethod, status: 404 }
  }

  const objData = data[0]

  const { error: errorImage } = await deleteImageByUrl(objData.image);

  if (errorImage) {
    errorMethod = { error: errorImage, message: 'ocurried an error while deleting image' }
    return { error: errorMethod, status: 500 }
  }

  const { error: errorBackground } = await deleteImageByUrl(objData.background);

  if (errorBackground) {
    errorMethod = { error: errorBackground, message: 'ocurried an error while deleting background' }
    return { error: errorMethod, status: 500 }
  }

  return { error: errorMethod, status: 200 }
}

export function convertToEmbedUrl(url: string): string | null {
  const videoIdMatch = url.match(/(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([^&]+)/);

  if (videoIdMatch && videoIdMatch[1]) {
    const videoId = videoIdMatch[1];
    return `https://www.youtube.com/embed/${videoId}`;
  }
  
  return url;
}

export function requireEnv(name: string | undefined): string {
  const value = Deno.env.get(name);
  if (!value) throw new Error(`Missing env var: ${name}`);
  return value;
}