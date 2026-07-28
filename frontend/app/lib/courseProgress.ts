import { apiFetch } from "./api";
import type { Certificate } from "./api";

export type CourseProgressResponse = {
  completedLessons: number[];
  certificate: Certificate | null;
};

export function courseProgressStorageKey(courseSlug: string) {
  return `eduflow-course-progress:${courseSlug}`;
}

export async function fetchCompletedLessons(courseSlug: string) {
  const data = await apiFetch<CourseProgressResponse>(`/courses/${courseSlug}/progress`);
  return data.completedLessons;
}

export async function fetchCourseProgress(courseSlug: string) {
  return apiFetch<CourseProgressResponse>(`/courses/${courseSlug}/progress`);
}

export function readCompletedLessons(courseSlug: string) {
  if (typeof window === "undefined") return [];

  const saved = window.localStorage.getItem(courseProgressStorageKey(courseSlug));
  if (!saved) return [];

  try {
    const parsed = JSON.parse(saved);
    if (!Array.isArray(parsed)) return [];

    return parsed.filter((lessonIndex): lessonIndex is number => Number.isInteger(lessonIndex));
  } catch {
    return [];
  }
}

export async function markLessonComplete(courseSlug: string, lessonIndex: number) {
  const data = await apiFetch<CourseProgressResponse>(`/courses/${courseSlug}/progress`, {
    method: "POST",
    body: JSON.stringify({ lessonIndex }),
  });

  window.localStorage.setItem(courseProgressStorageKey(courseSlug), JSON.stringify(data.completedLessons));
  window.dispatchEvent(new CustomEvent("course-progress-updated", { detail: { courseSlug } }));

  return data;
}

export async function fetchCertificate(courseSlug: string) {
  const data = await apiFetch<{ certificate: Certificate }>(`/courses/${courseSlug}/certificate`);
  return data.certificate;
}
