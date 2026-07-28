import { createCategory, deleteCategory, listCategories, updateCategory } from "../services/categoryService.js";

export async function index(req, res) {
  res.json(await listCategories());
}

export async function store(req, res, next) {
  try {
    res.status(201).json({ categories: await createCategory(req.db, req.body.name) });
  } catch (error) {
    next(error);
  }
}

export async function update(req, res, next) {
  try {
    res.json({ categories: await updateCategory(req.db, decodeURIComponent(req.params.name), req.body.name) });
  } catch (error) {
    next(error);
  }
}

export async function destroy(req, res) {
  res.json({ categories: await deleteCategory(req.db, decodeURIComponent(req.params.name)) });
}
