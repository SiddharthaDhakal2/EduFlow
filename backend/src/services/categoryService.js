import { readDb, writeDb } from "../database/jsonDb.js";
import { httpError } from "../middleware/errorHandler.js";

export async function listCategories() {
  const db = await readDb();
  const counts = Object.fromEntries(
    db.categories.map((category) => [category, db.courses.filter((course) => course.category === category).length]),
  );
  return { categories: db.categories, counts };
}

export async function createCategory(db, name) {
  const nextName = String(name || "").trim();
  if (!nextName) throw httpError(400, "Category name is required.");
  if (db.categories.some((category) => category.toLowerCase() === nextName.toLowerCase())) {
    throw httpError(409, "Category already exists.");
  }

  db.categories.push(nextName);
  db.categories.sort((a, b) => a.localeCompare(b));
  await writeDb(db);
  return db.categories;
}

export async function updateCategory(db, currentName, nextName) {
  const cleanName = String(nextName || "").trim();
  const index = db.categories.findIndex((category) => category === currentName);
  if (index === -1) throw httpError(404, "Category not found.");
  if (!cleanName) throw httpError(400, "Category name is required.");

  db.categories[index] = cleanName;
  db.courses.forEach((course) => {
    if (course.category === currentName) course.category = cleanName;
  });
  db.categories.sort((a, b) => a.localeCompare(b));
  await writeDb(db);
  return db.categories;
}

export async function deleteCategory(db, name) {
  db.categories = db.categories.filter((category) => category !== name);
  await writeDb(db);
  return db.categories;
}
