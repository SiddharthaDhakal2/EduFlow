import {
  enrollInCourse,
  getCourseCertificate,
  getCourseProgress,
  listLearningCourses,
  markLessonComplete,
} from "../services/learningService.js";

export function index(req, res) {
  res.json({ courses: listLearningCourses(req.db, req.user.id) });
}

export async function enroll(req, res) {
  await enrollInCourse(req.db, req.user, req.params.slug);
  res.json({ message: "Enrolled." });
}

export async function progress(req, res) {
  res.json(await getCourseProgress(req.db, req.user, req.params.slug));
}

export async function completeLesson(req, res) {
  res.json(await markLessonComplete(req.db, req.user, req.params.slug, req.body.lessonIndex));
}

export async function certificate(req, res) {
  res.json({ certificate: await getCourseCertificate(req.db, req.user, req.params.slug) });
}
