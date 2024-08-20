const DATA_FILE = "./data.json";

export async function readData() {
  try {
    const data = await Deno.readTextFile(DATA_FILE);
    return JSON.parse(data);
  } catch {
    return [];
  }
}

export async function writeData(data: any) {
  await Deno.writeTextFile(DATA_FILE, JSON.stringify(data, null, 2));
}