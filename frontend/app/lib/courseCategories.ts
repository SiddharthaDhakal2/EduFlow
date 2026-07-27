export const courseCategoryStorageKey = "eduflow-course-categories";

export const defaultCourseCategories = [
  "Web Development",
  "App Development",
  "Data Science",
  "Business",
  "Programming",
  "Python",
];

export function readSavedCourseCategories() {
  if (typeof window === "undefined") return defaultCourseCategories;

  const saved = window.localStorage.getItem(courseCategoryStorageKey);
  if (!saved) return defaultCourseCategories;

  try {
    const parsed = JSON.parse(saved);
    if (!Array.isArray(parsed)) return defaultCourseCategories;

    const categories = parsed.filter((category): category is string => typeof category === "string" && category.trim().length > 0);
    return categories.length > 0 ? categories : defaultCourseCategories;
  } catch {
    return defaultCourseCategories;
  }
}

export function saveCourseCategories(categories: string[]) {
  window.localStorage.setItem(courseCategoryStorageKey, JSON.stringify(categories));
  window.dispatchEvent(new Event("course-categories-updated"));
}
