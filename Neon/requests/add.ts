import { StatusCode } from "../../deps.ts";
import sql from "../index.ts";
import { Tables } from "../types.ts";

export const generateSqlInsert = (params: Record<string, unknown>) => {
  const keys = Object.keys(params);
  const values = Object.values(params);

  if (keys.length === 0) throw new Error('No params provided');

  const columnsSql = keys
    .map((k) => sql.unsafe(k))
    .reduce((acc, curr, i) => (i === 0 ? curr : sql`${acc}, ${curr}`));

  const valuesSql = values
    .map((v) => sql`${v}`)
    .reduce((acc, curr, i) => (i === 0 ? curr : sql`${acc}, ${curr}`));

  return { columnsSql, valuesSql };
};

export const addItemToTable = async (table: Tables, data:Record<string, unknown>) => {
  try {
    const { columnsSql, valuesSql } = generateSqlInsert(data);
    console.log(columnsSql, valuesSql)
    const result = await sql`
      INSERT INTO ${sql.unsafe(table)} (${columnsSql})
      VALUES (${valuesSql})
      RETURNING*;
    `;

    return {
      data: result,
      error: null,
      status: 200 as StatusCode,
    };
  } catch (error) {
    return {
      data: null,
      error: error,
      status: 500 as StatusCode,
    };
  }
}

export const addRelation = async <T extends { id: number; }>(table: Tables, dataArray: T[], id: number) => {
  try {
    if (dataArray.length === 0) {
      return { data: [], error: null, status: 200 as StatusCode };
    }

    const columns = tableColumnsMap[table] ?? '';
    
    const valuesSql = dataArray
      .map((data) => sql`(${id}, ${data.id})`)
      .reduce((acc, curr, i) => (i === 0 ? curr : sql`${acc}, ${curr}`));
  
    const result = await sql`
      INSERT INTO ${sql.unsafe(table)} ${sql.unsafe(columns)}
      VALUES ${valuesSql}
      RETURNING *;
    `;
  
    return { data: result, error: null, status: 200 as StatusCode };
  } catch (error) {
    console.log(error);
    return { data: null, error, status: 500 as StatusCode };
  }
}

const tableColumnsMap: Record<string, string> = {
  jobs_games: '(job_id, game_id)',
  games_skills: '(game_id, skill_id)',
  jobs_skills: '(job_id, skill_id)',
};
