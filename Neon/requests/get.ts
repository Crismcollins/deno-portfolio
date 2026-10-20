import { StatusCode } from "../../deps.ts";
import sql, { Language, Tables } from "../index.ts";

export const getTable = async <T = Record<string, unknown>>(
  table: Tables,
  language?: Language
) => {
  try {
    const query = language ? await sql`
    SELECT * FROM ${sql.unsafe(table)}
    WHERE language = ${language}
  ` : await sql`SELECT * FROM ${sql.unsafe(table)}`;

    return {
      data: query as T[],
      status: 200 as StatusCode,
      message: 'OK',
      error: null,
    };
  } catch (error) {
    return {
      data: [] as T[],
      status: 500,
      message: 'Error',
      error: error.message,
    };
  }
};

export const getItem = async <T = Record<string, unknown>>(
  table: Tables,
  id: number,
  customLabelId: string = 'id'
) => {
  try {
    const data = await sql`
      SELECT * FROM ${sql.unsafe(table)}
      WHERE ${sql.unsafe(customLabelId)} = ${id}
    `;

    return {
      data: data as T[],
      status: 200 as StatusCode,
      message: 'OK',
      error: null,
    };
  } catch (error) {
    return {
      data: [] as T[],
      status: 500 as StatusCode,
      message: 'Error',
      error: error.message,
    };
  }
};

export const getItems = async <T = Record<string, unknown>>(
  table: Tables,
  ids: number[],
  customLabelId: string = 'id'
) => {
  try {
    const data = await sql`
      SELECT * FROM ${sql.unsafe(table)}
      WHERE ${sql.unsafe(customLabelId)} = ANY(${sql`${ids}`})
    `;

    return {
      data: data as T[],
      skillsStatus: 200 as StatusCode,
      skillsMessage: 'OK',
      error: null,
    };
  } catch (error) {
    return {
      data: [] as T[],
      skillsStatus: 500 as StatusCode,
      skillsMessage: 'Error',
      error: error.message,
    };
  }
};


export const getMyUser = async (language: Language = 'en') => {
  try {
    const id = language === 'es' ? 1 : 2;
    
    const data = await sql`
      SELECT * FROM users
      WHERE id = ${id}
    `;
    
    return data;
  } catch (error) {
    return error.message;
  }
};
