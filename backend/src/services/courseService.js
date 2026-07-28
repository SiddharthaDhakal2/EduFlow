import { readDb, writeDb } from "../database/jsonDb.js";
import { httpError } from "../middleware/errorHandler.js";
import { displayDate, slugify } from "../utils/format.js";

export function courseWithCounts(db, course) {
  return {
    ...course,
    lessons: course.lessonItems.length,
    students: db.enrollments.filter((item) => item.courseSlug === course.slug).length,
  };
}

export function hasActiveMembership(db, userId) {
  const membership = db.memberships.find((item) => item.userId === userId && item.active);
  if (!membership) return false;
  if (!membership.expiryDate) return true;
  return new Date(membership.expiryDate).getTime() >= Date.now();
}

export function canAccessCourse(db, user, course) {
  if (user?.role === "admin") return true;
  if (course.access !== "Paid") return true;
  return Boolean(user && hasActiveMembership(db, user.id));
}

export function assertCourseAccess(db, user, course) {
  if (!canAccessCourse(db, user, course)) {
    throw httpError(403, "Membership is required to access this paid course.");
  }
}

export async function listCourses({ includeDrafts = false } = {}) {
  const db = await readDb();
  return db.courses
    .filter((course) => includeDrafts || course.status === "Published")
    .map((course) => courseWithCounts(db, course));
}

export async function getCourse(slug, user = null) {
  const db = await readDb();
  const course = db.courses.find((item) => item.slug === slug);
  if (!course) throw httpError(404, "Course not found.");
  assertCourseAccess(db, user, course);
  return courseWithCounts(db, course);
}

function uploadPath(file) {
  return file ? `/uploads/admin/${file.filename}` : undefined;
}

export async function createCourse(db, payload = {}, files = {}) {
  payload = payload || {};
  if (!payload.title || !payload.description || !payload.duration) {
    throw httpError(400, "Title, description, and duration are required.");
  }

  let rawLessons = payload.lessonItems || [];
  if (typeof payload.lessonItems === "string") {
    try {
      rawLessons = JSON.parse(payload.lessonItems);
    } catch {
      throw httpError(400, "Lesson data is invalid.");
    }
  }
  const parsedLessons = Array.isArray(rawLessons) ? rawLessons : [];
  const lessonVideos = files.lessonVideos || [];
  const thumbnail = files.thumbnail?.[0];

  const baseSlug = slugify(payload.title || "course");
  let slug = baseSlug;
  let suffix = 2;
  while (db.courses.some((course) => course.slug === slug)) slug = `${baseSlug}-${suffix++}`;

  const now = displayDate();
  const course = {
    id: Math.max(...db.courses.map((item) => item.id), 0) + 1,
    slug,
    title: payload.title,
    category: payload.category,
    instructor: payload.instructor || "EduFlow Instructor",
    difficulty: payload.difficulty || "Beginner",
    duration: payload.duration,
    access: payload.access || "Free",
    status: payload.status || "Draft",
    image: uploadPath(thumbnail) || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80",
    description: payload.description,
    lessonItems: parsedLessons.filter(Boolean).map((lesson) => {
      const videoFile = Number.isInteger(lesson.videoFileIndex) ? lessonVideos[lesson.videoFileIndex] : null;
      return {
        title: lesson?.title || "Untitled lesson",
        type: lesson?.type || "Text",
        textContent: lesson?.textContent,
        videoTitle: lesson?.videoTitle || videoFile?.originalname,
        videoUrl: uploadPath(videoFile),
      };
    }),
    created: now,
    updated: now,
  };

  db.courses.push(course);
  await writeDb(db);
  return courseWithCounts(db, course);
}

export async function updateCourse(db, slug, payload = {}, files = {}) {
  payload = payload || {};
  const course = db.courses.find((item) => item.slug === slug);
  if (!course) throw httpError(404, "Course not found.");

  if (!payload.title || !payload.description || !payload.duration) {
    throw httpError(400, "Title, description, and duration are required.");
  }

  let rawLessons = payload.lessonItems || [];
  if (typeof payload.lessonItems === "string") {
    try {
      rawLessons = JSON.parse(payload.lessonItems);
    } catch {
      throw httpError(400, "Lesson data is invalid.");
    }
  }

  const parsedLessons = Array.isArray(rawLessons) ? rawLessons : [];
  const lessonVideos = files.lessonVideos || [];
  const thumbnail = files.thumbnail?.[0];

  Object.assign(course, {
    title: payload.title,
    category: payload.category,
    instructor: payload.instructor || "EduFlow Instructor",
    difficulty: payload.difficulty || "Beginner",
    duration: payload.duration,
    access: payload.access || "Free",
    status: payload.status || "Draft",
    image: uploadPath(thumbnail) || course.image,
    description: payload.description,
    lessonItems: parsedLessons.filter(Boolean).map((lesson) => {
      const videoFile = Number.isInteger(lesson.videoFileIndex) ? lessonVideos[lesson.videoFileIndex] : null;
      return {
        title: lesson?.title || "Untitled lesson",
        type: lesson?.type || "Text",
        textContent: lesson?.textContent,
        videoTitle: lesson?.videoTitle || videoFile?.originalname,
        videoUrl: uploadPath(videoFile) || lesson?.videoUrl,
      };
    }),
    updated: displayDate(),
  });

  await writeDb(db);
  return courseWithCounts(db, course);
}

export async function deleteCourse(db, slug) {
  db.courses = db.courses.filter((course) => course.slug !== slug);
  db.enrollments = db.enrollments.filter((item) => item.courseSlug !== slug);
  await writeDb(db);
}

export async function listFeaturedCourses() {
  return (await readDb()).featuredCourses;
}
