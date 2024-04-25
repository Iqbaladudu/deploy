import Dexie from "dexie";

export const db = new Dexie("IndonesiaAI");
db.version(1).stores({
  project: "id++, name, workspace, category, img_count, time",
  workspace: "id++, name, slug, project_count, time",
  upload: "id++, batch_name, data, time, status",
  boundingBox: "id++, x, y, width, height, label",
});
