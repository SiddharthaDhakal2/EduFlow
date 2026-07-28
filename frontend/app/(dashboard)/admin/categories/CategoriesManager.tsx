"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { createCourseCategory, defaultCourseCategories, deleteCourseCategory, fetchCourseCategories, updateCourseCategory } from "../../../lib/courseCategories";
import { showToast } from "../../../lib/toast";

export default function CategoriesManager() {
  const [categories, setCategories] = useState<string[]>(defaultCourseCategories);
  const [postedCourseCounts, setPostedCourseCounts] = useState<Record<string, number>>({});
  const [categoryName, setCategoryName] = useState("");
  const [editingCategory, setEditingCategory] = useState<string | null>(null);
  const [categoryToDelete, setCategoryToDelete] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  const totalPostedCourses = useMemo(
    () => categories.reduce((sum, category) => sum + getPostedCount(category), 0),
    [categories],
  );

  useEffect(() => {
    const timeoutId = window.setTimeout(loadCategories, 0);

    return () => window.clearTimeout(timeoutId);
  }, []);

  async function loadCategories() {
    const data = await fetchCourseCategories();
    setCategories(data.categories);
    setPostedCourseCounts(data.counts);
  }

  function resetForm() {
    setCategoryName("");
    setEditingCategory(null);
    setError("");
  }

  async function saveCategory(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextCategory = categoryName.trim();
    if (!nextCategory) {
      setError("Category name is required.");
      return;
    }

    const exists = categories.some(
      (category) => category.toLowerCase() === nextCategory.toLowerCase() && category !== editingCategory,
    );
    if (exists) {
      setError("This category already exists.");
      return;
    }

    const sortedCategories = editingCategory
      ? await updateCourseCategory(editingCategory, nextCategory)
      : await createCourseCategory(nextCategory);
    setCategories(sortedCategories);
    await loadCategories();
    const message = editingCategory ? `${nextCategory} updated.` : `${nextCategory} added.`;
    setNotice(message);
    showToast(message);
    resetForm();
  }

  function startEdit(category: string) {
    setCategoryName(category);
    setEditingCategory(category);
    setError("");
    setNotice("");
  }

  async function confirmDeleteCategory() {
    if (!categoryToDelete) return;

    const nextCategories = await deleteCourseCategory(categoryToDelete);
    setCategories(nextCategories);
    await loadCategories();
    const message = `${categoryToDelete} deleted.`;
    setNotice(message);
    showToast(message);
    setCategoryToDelete(null);

    if (editingCategory === categoryToDelete) {
      resetForm();
    }
  }

  function getPostedCount(category: string) {
    return postedCourseCounts[category] ?? 0;
  }

  return (
    <div className="space-y-5">
      {notice && (
        <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700">
          {notice}
        </div>
      )}

      <section>
        <h1 className="text-2xl font-bold text-slate-950">Categories</h1>
        <p className="mt-1 text-sm text-slate-500">
          Manage course categories shown in course dropdowns.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <SummaryCard label="Total Categories" value={categories.length.toString()} />
        <SummaryCard label="Posted Courses" value={totalPostedCourses.toString()} />
        <SummaryCard label="Empty Categories" value={categories.filter((category) => getPostedCount(category) === 0).length.toString()} />
      </section>

      <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <form className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_140px_90px]" onSubmit={saveCategory}>
          <label className="block">
            <span className="text-xs font-bold text-slate-500">Category name</span>
            <input
              className="mt-1 h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-950 outline-none transition focus:border-blue-200 focus:ring-4 focus:ring-blue-600/10"
              placeholder="Python"
              value={categoryName}
              onChange={(event) => {
                setCategoryName(event.target.value);
                setError("");
              }}
            />
            {error && <span className="mt-1 block text-xs font-semibold text-red-600">{error}</span>}
          </label>
          <button className="h-11 self-end rounded-lg bg-blue-600 px-4 text-sm font-bold text-white transition hover:bg-blue-700" type="submit">
            {editingCategory ? "Update" : "Add"}
          </button>
          <button className="h-11 self-end rounded-lg border border-slate-200 bg-white px-4 text-sm font-bold text-slate-700 transition hover:bg-slate-50" type="button" onClick={resetForm}>
            Clear
          </button>
        </form>
      </section>

      <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="hidden grid-cols-[minmax(0,1fr)_160px_120px] gap-4 border-b border-slate-200 bg-slate-50 px-5 py-3 text-xs font-bold text-slate-500 md:grid">
          <span>Category</span>
          <span>Posted Courses</span>
          <span className="text-right">Actions</span>
        </div>

        <div className="divide-y divide-slate-100">
          {categories.map((category) => (
            <article key={category} className="grid gap-3 px-5 py-4 text-sm md:grid-cols-[minmax(0,1fr)_160px_120px] md:items-center">
              <div>
                <h2 className="font-bold text-slate-950">{category}</h2>
                <p className="mt-1 text-xs text-slate-500 md:hidden">
                  {getPostedCount(category)} posted courses
                </p>
              </div>
              <div className="hidden text-sm font-semibold text-slate-600 md:block">
                {getPostedCount(category)}
              </div>
              <div className="flex items-center justify-start gap-2 md:justify-end">
                <button
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-blue-100 bg-blue-50 text-blue-600 transition hover:border-blue-200 hover:bg-blue-100"
                  type="button"
                  aria-label={`Edit ${category}`}
                  onClick={() => startEdit(category)}
                >
                  <EditIcon />
                </button>
                <button
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-red-100 bg-red-50 text-red-600 transition hover:border-red-200 hover:bg-red-100"
                  type="button"
                  aria-label={`Delete ${category}`}
                  onClick={() => setCategoryToDelete(category)}
                >
                  <TrashIcon />
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {categoryToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/10 px-4 py-6 backdrop-blur-[8px]">
          <div className="w-full max-w-sm rounded-xl border border-slate-200 bg-white p-5 shadow-xl">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-lg font-bold text-slate-950">Delete category?</h2>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Are you sure you want to delete{" "}
                  <span className="font-bold text-slate-950">{categoryToDelete}</span>?
                </p>
              </div>
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-red-50 text-red-600">
                <TrashIcon />
              </span>
            </div>
            <div className="mt-5 flex justify-end gap-2">
              <button
                className="h-10 rounded-lg border border-slate-200 bg-white px-4 text-sm font-bold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
                type="button"
                onClick={() => setCategoryToDelete(null)}
              >
                Cancel
              </button>
              <button
                className="h-10 rounded-lg bg-red-600 px-4 text-sm font-bold text-white shadow-sm transition hover:bg-red-700"
                type="button"
                onClick={confirmDeleteCategory}
              >
                Delete Category
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function SummaryCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <p className="text-sm font-medium text-slate-500">{label}</p>
      <div className="mt-2 text-2xl font-bold text-slate-950">{value}</div>
    </div>
  );
}

function EditIcon() {
  return (
    <svg aria-hidden="true" className="h-4 w-4" fill="none" viewBox="0 0 24 24">
      <path d="m14.5 5.5 4 4M4 20h4l10.5-10.5a2.8 2.8 0 0 0-4-4L4 16v4Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
    </svg>
  );
}

function TrashIcon() {
  return (
    <svg aria-hidden="true" className="h-4 w-4" fill="none" viewBox="0 0 24 24">
      <path d="M5 7h14M10 11v6M14 11v6M8 7l1-3h6l1 3m-9 0 1 13h8l1-13" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
    </svg>
  );
}
