import { StatusCode } from "../../deps.ts";
import sql, { User } from "../index.ts";
import { RelationalTables, Tables } from "../types.ts";

const tableColumnsMap: Record<RelationalTables, { mainId: string; relatedId: string }> = {
  games_skills: { mainId: 'game_id', relatedId: 'skill_id' },
  jobs_skills: { mainId: 'job_id', relatedId: 'skill_id' },
  jobs_games:  { mainId: 'job_id', relatedId: 'game_id' },
};

export const updateTable = async <T extends { id: number }>(table: Tables, data: T) => {
  try {
    const { id, ...rest } = data;

    const updateFragments = Object.entries(rest).map(
      ([key, value]) => sql`${sql.unsafe(key)} = ${value}`
    );

    const updateSql = updateFragments.reduce((acc, curr, i) =>
      i === 0 ? curr : sql`${acc}, ${curr}`
    );

    const newData = await sql`
      UPDATE ${sql.unsafe(table)}
      SET ${updateSql}
      WHERE id = ${id}
      RETURNING *;
    `;

    return {
      data: newData,
      error: null,
      status: 200 as const,
    };
  } catch (error) {
    return {
      data: null,
      error,
      status: 500 as const,
    };
  }
};


export const updateRelationTable = async <T extends { id: number }>(
  table: RelationalTables,
  mainId: number,
  dataArray: T[]
) => {
  try {
    const { mainId: mainColumn, relatedId } = tableColumnsMap[table];

    const newIds = dataArray.map(item => item.id);

    // 1. Obtener relaciones actuales
    const currentRelations: Array<{ [key: string]: number }> = await sql`
      SELECT ${sql.unsafe(relatedId)} FROM ${sql.unsafe(table)}
      WHERE ${sql.unsafe(mainColumn)} = ${mainId}
    `;

    const currentIds = currentRelations.map((row: Record<string, number>) => row[relatedId]);

    // 2. Calcular qué agregar y qué eliminar
    const toAdd = newIds.filter(id => !currentIds.includes(id));
    const toRemove = currentIds.filter((id: number) => !newIds.includes(id));

    // 3. Eliminar relaciones no deseadas
    if (toRemove.length > 0) {
      const valuePlaceholders = toRemove
        .map((id: number) => sql`${id}`)
        .reduce((acc, curr, i: number) => (i === 0 ? curr : sql`${acc}, ${curr}`));
    
      await sql`
        DELETE FROM ${sql.unsafe(table)}
        WHERE ${sql.unsafe(mainColumn)} = ${mainId}
        AND ${sql.unsafe(relatedId)} IN (${valuePlaceholders})
      `;
    }

    // 4. Insertar nuevas relaciones
    if (toAdd.length > 0) {
      const values = toAdd
        .map(id => sql`(${mainId}, ${id})`)
        .reduce((acc, curr, i) => i === 0 ? curr : sql`${acc}, ${curr}`);

      await sql`
        INSERT INTO ${sql.unsafe(table)} (${sql.unsafe(mainColumn)}, ${sql.unsafe(relatedId)})
        VALUES ${values}
      `;
    }

    return {
      status: 200 as StatusCode,
      error: null,
    };
  } catch (error) {
    console.error(error);
    return {
      status: 500 as StatusCode,
      error,
    };
  }
};


export const updateUser = async (user: User) => {
  try {
    const { id, ...rest} = user;

    const updates = Object.entries(rest).map(
      ([key, value]) => `${key} = '${value}'`
    )

    const data: User = await sql`
      UPDATE users
      SET ${sql.unsafe(updates)}
      WHERE id = ${id}
      RETURNING *;
    `;
    
    return {
      data: data,
      error: null,
      status: 200,
    };
  } catch (error) {
    
    return {
      data: null,
      error,
      status: (error.code ?? 500) as StatusCode,
    };
  }
}
