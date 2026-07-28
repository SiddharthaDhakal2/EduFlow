import { createCourse, deleteCourse, getCourse, listCourses, listFeaturedCourses, updateCourse } from "../services/courseService.js";

export async function index(req, res) {
  res.json({ courses: await listCourses({ includeDrafts: req.query.includeDrafts === "true" }) });
}

export async function featured(req, res) {
  res.json({ courses: await listFeaturedCourses() });
}

export async function show(req, res, next) {
  try {
    res.json({ course: await getCourse(req.params.slug, req.user) });
  } catch (error) {
    next(error);
  }
}

export async function store(req, res, next) {
  try {
    res.status(201).json({ course: await createCourse(req.db, req.body, req.files) });
  } catch (error) {
    next(error);
  }
}

export async function update(req, res, next) {
  try {
    res.json({ course: await updateCourse(req.db, req.params.slug, req.body, req.files) });
  } catch (error) {
    next(error);
  }
}

export async function destroy(req, res) {
  await deleteCourse(req.db, req.params.slug);
  res.json({ message: "Course deleted." });
}
