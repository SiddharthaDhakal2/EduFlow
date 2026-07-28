import { writeDb } from "../database/jsonDb.js";
import { assertCourseAccess, courseWithCounts } from "./courseService.js";

function certificateId(userId, courseSlug) {
  const normalizedSlug = String(courseSlug).replace(/[^a-z0-9-]/gi, "").toUpperCase();
  return `EDU-${userId}-${normalizedSlug}`;
}

function completedLessonCount(enrollment, totalLessons) {
  const validLessons = new Set(
    enrollment.completedLessons.filter((lessonIndex) => Number.isInteger(lessonIndex) && lessonIndex >= 1 && lessonIndex <= totalLessons),
  );
  return validLessons.size;
}

function buildCertificate(user, course) {
  return {
    id: certificateId(user.id, course.slug),
    userId: user.id,
    userName: user.name,
    userEmail: user.email,
    courseSlug: course.slug,
    courseTitle: course.title,
    instructor: course.instructor,
    issuedAt: new Date().toISOString(),
  };
}

function ensureCertificate(enrollment, user, course) {
  const totalLessons = course.lessonItems.length;
  const isComplete = totalLessons > 0 && completedLessonCount(enrollment, totalLessons) === totalLessons;

  if (!isComplete) return null;

  if (!enrollment.certificate) {
    enrollment.certificate = buildCertificate(user, course);
  }

  return enrollment.certificate;
}

export function getEnrollment(db, userId, courseSlug) {
  let enrollment = db.enrollments.find((item) => item.userId === userId && item.courseSlug === courseSlug);

  if (!enrollment) {
    enrollment = { userId, courseSlug, completedLessons: [], certificate: null };
    db.enrollments.push(enrollment);
  }

  if (!Array.isArray(enrollment.completedLessons)) enrollment.completedLessons = [];
  if (!Object.prototype.hasOwnProperty.call(enrollment, "certificate")) enrollment.certificate = null;

  return enrollment;
}

export function listLearningCourses(db, userId) {
  return db.enrollments
    .filter((item) => item.userId === userId)
    .map((enrollment) => {
      const course = db.courses.find((item) => item.slug === enrollment.courseSlug);
      if (!course) return null;

      const totalLessons = course.lessonItems.length;
      const completedLessons = completedLessonCount(enrollment, totalLessons);
      const progress = totalLessons ? Math.round((completedLessons / totalLessons) * 100) : 0;

      return {
        ...courseWithCounts(db, course),
        completedLessons,
        totalLessons,
        progress,
        certificate: progress === 100 ? enrollment.certificate : null,
        lastActivity: completedLessons > 0 ? "Recently" : "Not started",
      };
    })
    .filter(Boolean);
}

function findCourseOrThrow(db, courseSlug) {
  const course = db.courses.find((item) => item.slug === courseSlug);
  if (!course) {
    const error = new Error("Course not found.");
    error.status = 404;
    throw error;
  }
  return course;
}

export async function enrollInCourse(db, user, courseSlug) {
  const course = findCourseOrThrow(db, courseSlug);
  assertCourseAccess(db, user, course);
  getEnrollment(db, user.id, courseSlug);
  await writeDb(db);
}

export async function getCourseProgress(db, user, courseSlug) {
  const course = findCourseOrThrow(db, courseSlug);
  assertCourseAccess(db, user, course);
  const enrollment = getEnrollment(db, user.id, courseSlug);
  const certificate = ensureCertificate(enrollment, user, course);
  await writeDb(db);
  return { completedLessons: enrollment.completedLessons, certificate };
}

export async function markLessonComplete(db, user, courseSlug, lessonIndex) {
  const course = findCourseOrThrow(db, courseSlug);
  assertCourseAccess(db, user, course);
  const enrollment = getEnrollment(db, user.id, courseSlug);
  const index = Number(lessonIndex);

  if (!Number.isInteger(index) || index < 1 || index > course.lessonItems.length) {
    const error = new Error("Invalid lesson.");
    error.status = 422;
    throw error;
  }

  if (!enrollment.completedLessons.includes(index)) {
    enrollment.completedLessons.push(index);
    enrollment.completedLessons.sort((a, b) => a - b);
  }

  const certificate = ensureCertificate(enrollment, user, course);
  await writeDb(db);
  return { completedLessons: enrollment.completedLessons, certificate };
}

export async function getCourseCertificate(db, user, courseSlug) {
  const course = findCourseOrThrow(db, courseSlug);
  assertCourseAccess(db, user, course);
  const enrollment = getEnrollment(db, user.id, courseSlug);
  const certificate = ensureCertificate(enrollment, user, course);

  if (!certificate) {
    const error = new Error("Complete all lessons to unlock this certificate.");
    error.status = 403;
    throw error;
  }

  await writeDb(db);
  return certificate;
}
