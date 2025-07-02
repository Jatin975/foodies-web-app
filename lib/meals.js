import sql from "better-sqlite3";
import slugify from "slugify";
import xss from "xss";
import fs from 'node:fs';

const db = sql("meals.db");

export async function getAllMeals() {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  // throw new Error("Failed to load the meals");
  return db.prepare("SELECT * from meals").all();
}

export function getMealDetails(slug){
  return db.prepare("SELECT * FROM meals where slug = ?").get(slug);
}

export async function saveMeal(meal){
  meal.slug = slugify(meal.title, {lower: true});
  meal.instructions = xss(meal.instructions);

  const extension = meal.image.name.split('.').pop();
  const fileName = `${meal.slug}.${extension}`;

  const stream = fs.createWriteStream(`public/images/${fileName}`);
  const buffer = await meal.image.arrayBuffer();

  stream.write(Buffer.from(buffer), (error)=>{
    if(error){
      throw new Error("Failed to save file!");
    }
  })

  meal.image = `/images/${fileName}`;
  
  db.prepare(`INSERT INTO meals (
       slug,
       title,
       image,
       summary,
       instructions,
       creator,
       creator_email) VALUES
       (@slug,
         @title,
         @image,
         @summary,
         @instructions,
         @creator,
         @creator_email
         )
    `).run(meal);
}