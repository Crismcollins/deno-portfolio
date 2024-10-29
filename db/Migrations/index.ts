import supabase from "../../Supabase/index.ts";

export const executeAllMigrations = async () => {
  
  let errorMigration = null;
  const migrationFolderPath = "./Supabase/migrations";
  const migrationsFolder = Deno.readDir(migrationFolderPath);

  for await (const file of migrationsFolder) {
    if (file.isFile && file.name.endsWith(".sql")) {

      const fnName = file.name.replace('.sql', '').replace(/^\d+_/, "");
      
      const { error } = await supabase.rpc(fnName);

      if (error){
        const errorMsge = `ERROR ${file.name} migration. ${error.message}`;
        console.error(errorMsge);
        errorMigration = errorMsge;
        return { error: errorMigration };
      }
      else {
        const successMsge = `OK Migration ${file.name} executed successfully!!`
        console.log(successMsge);
      }
    }
  }

  return { error: null };
}
