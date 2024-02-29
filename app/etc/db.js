import Dexie from "dexie";

export const db = new Dexie("IndonesiaAI");
db.version(1).stores({
  project: "id++, name, category, img_count, time",
  workspace: "id++, name, project_count, time",
});
