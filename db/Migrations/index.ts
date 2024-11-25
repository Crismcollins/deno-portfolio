import supabase from "../../Supabase/index.ts";

const MIGRATIONS_PATH = "./Supabase/migrations";

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

  for (const file of files) {
    const fnName = file.name.replace('.sql', '').replace(/^\d+_/, "");
    
    const { error } = await supabase.rpc(fnName);

    if (error) {
      const errorMsge = `ERROR ${file.name} migration. ${error.message}`;
      console.error(errorMsge);
      errorMigration = errorMsge;
      return { error: errorMigration };
    } else {
      const successMsge = `OK Migration ${file.name} executed successfully!!`
      console.log(successMsge);
    }
  }

  console.info('Script migrations ended.')

  return { error: null };
}

