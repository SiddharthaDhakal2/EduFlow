import { apiFetch } from "./api";

export const courseCategoryStorageKey = "eduflow-course-categories";

export const defaultCourseCategories = [
  "Web Development",
  "App Development",
  "Data Science",
  "Business",
  "Programming",
  "Python",
];

export async function fetchCourseCategories() {
  const data = await apiFetch<{ categories: string[]; counts: Record<string, number> }>("/categories");
  return data;
}

export function readSavedCourseCategories() {
  return defaultCourseCategories;
}

export async function createCourseCategory(name: string) {
  const data = await apiFetch<{ categories: string[] }>("/categories", {
    method: "POST",
    body: JSON.stringify({ name }),
  });
  window.dispatchEvent(new Event("course-categories-updated"));
  return data.categories;
}

export async function updateCourseCategory(currentName: string, name: string) {
  const data = await apiFetch<{ categories: string[] }>(`/categories/${encodeURIComponent(currentName)}`, {
    method: "PUT",
    body: JSON.stringify({ name }),
  });
  window.dispatchEvent(new Event("course-categories-updated"));
  return data.categories;
}

export async function deleteCourseCategory(name: string) {
  const data = await apiFetch<{ categories: string[] }>(`/categories/${encodeURIComponent(name)}`, {
    method: "DELETE",
  });
  window.dispatchEvent(new Event("course-categories-updated"));
  return data.categories;
}

export function saveCourseCategories(categories: string[]) {
  window.localStorage.setItem(courseCategoryStorageKey, JSON.stringify(categories));
  window.dispatchEvent(new Event("course-categories-updated"));
}
