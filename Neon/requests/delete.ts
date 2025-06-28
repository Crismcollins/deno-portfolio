
import { StatusCode } from "../../deps.ts";
import sql from "../index.ts";
import { Tables } from "../types.ts";

type DeleteResult = {
  data: unknown | null;
  message?: string;
  error?: unknown | null;
  status: StatusCode;
};

/**
 * Borra un registro de una tabla por una columna y valor.
 * @param table Nombre de la tabla
 * @param column Nombre de la columna para el filtro (ej: 'id')
 * @param value Valor que debe coincidir para borrar
 */
export async function deleteItem<T = unknown>(
  table: Tables,
  column: string,
  value: T
): Promise<DeleteResult> {
  try {
    const data = await sql`
      DELETE FROM ${sql.unsafe(table)}
      WHERE ${sql.unsafe(column)} = ${value}
    `;

    return {
      data,
      message: 'Deleted successfully',
      error: null,
      status: 200,
    };
  } catch (error) {
    return {
      data: null,
      message: (error as Error).message,
      error,
      status: error.code ?? 500,
    };
  }
}
