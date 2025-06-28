import { StatusCode } from "../../deps.ts";
import sql, { Language, Tables } from "../index.ts";

export const getTable = async (table: Tables, language?: Language) => {
  try {
    const query = language ? await sql`
    SELECT * FROM ${sql.unsafe(table)}
    WHERE language = ${language}
  ` : await sql`SELECT * FROM ${sql.unsafe(table)}`;
    
    return {
      data: query,
      status: 200 as StatusCode,
      message: 'OK',
      error: null,
    };
  } catch (error) {
    return {
      data: [],
      status: 500,
      message: 'Error',
      error: error.message,
    };
  }
};

export const getItem = async (table: Tables, id: number, customLabelId: string = 'id') => {
  try {
    const data = await sql`
      SELECT * FROM ${sql.unsafe(table)}
      WHERE ${sql.unsafe(customLabelId)} = ${id}
    `;

    return {
      data,
      status: 200 as StatusCode,
      message: 'OK',
      error: null,
    };
  } catch (error) {
    return {
      data: [],
      status: 500 as StatusCode,
      message: 'Error',
      error: error.message,
    };
  }
};

export const getItems = async (
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
      data,
      status: 200 as StatusCode,
      message: 'OK',
      error: null,
    };
  } catch (error) {
    return {
      data: [],
      status: 500 as StatusCode,
      message: 'Error',
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
