export function courseProgressStorageKey(courseSlug: string) {
  return `eduflow-course-progress:${courseSlug}`;
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

export function markLessonComplete(courseSlug: string, lessonIndex: number) {
  const completedLessons = readCompletedLessons(courseSlug);
  const nextCompletedLessons = Array.from(new Set([...completedLessons, lessonIndex]));

  window.localStorage.setItem(courseProgressStorageKey(courseSlug), JSON.stringify(nextCompletedLessons));
  window.dispatchEvent(new CustomEvent("course-progress-updated", { detail: { courseSlug } }));

  return nextCompletedLessons;
}
