import sql from "better-sqlite3";

const db = sql("meals.db");

export async function getAllMeals() {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  // throw new Error("Failed to load the meals");
  return db.prepare("SELECT * from meals").all();
}

export function getMealDetails(slug){
  return db.prepare("SELECT * FROM meals where slug = ?").get(slug);
}