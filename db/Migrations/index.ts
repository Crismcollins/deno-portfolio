import client from "../client.ts";
import { openConnection, closeConnection, executeQuery } from "../index.ts";

const MIGRATIONS_PATH = "./Neon/migrations";

export const executeAllMigrations = async () => {
  let errorMigration = null;
  const migrationFolderPath = MIGRATIONS_PATH;
  const migrationsFolder = Deno.readDir(migrationFolderPath);

  const files = [];
  for await (const file of migrationsFolder) {
    if (file.isFile && file.name.endsWith(".sql")) {
      files.push(file);
    }
  }

  files.sort((a, b) => a.name.localeCompare(b.name));

  try {
    await openConnection();
    const { rows } = await client.queryArray("SELECT NOW()");
    console.log("Conexión exitosa. Fecha actual:", rows);

    for (const file of files) {
      const filePath = `${migrationFolderPath}/${file.name}`;
      const sql = await Deno.readTextFile(filePath);

      try {
        await executeQuery(sql);
        console.log(`OK Migration ${file.name} executed successfully!!`);
      } catch (error) {
        const errorMsge = `ERROR ${file.name} migration. ${error.message}`;
        console.error(errorMsge);
        errorMigration = errorMsge;
        break;
      }
    }
  } finally {
    await closeConnection();
  }

  console.info('Script migrations ended.');

  return { error: errorMigration };
};
