"use client";

import Link from "next/link";
import { ChangeEvent, useEffect, useState } from "react";
import { defaultCourseCategories, readSavedCourseCategories } from "../../../../lib/courseCategories";

type UploadFile = {
  name: string;
  preview?: string;
};

type Lesson = {
  id: number;
  type: "Text" | "Video" | "Text and Video";
  title: string;
  textContent: string;
  videoFile: UploadFile | null;
};

const steps = ["Course Details", "Lessons", "Settings", "Summary"];

export default function NewCourseBuilder() {
  const [step, setStep] = useState(0);
  const [notice, setNotice] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [categoryOptions, setCategoryOptions] = useState(defaultCourseCategories);
  const [course, setCourse] = useState({
    title: "",
    description: "",
    category: "Web Development",
    difficulty: "Beginner",
    duration: "",
    instructor: "",
    priceType: "Free",
    status: "Draft",
    thumbnail: null as UploadFile | null,
  });
  const [lessons, setLessons] = useState<Lesson[]>([
    { id: 1, type: "Text", title: "Welcome to the course", textContent: "", videoFile: null },
  ]);

  useEffect(() => {
    function syncCategories() {
      const nextCategories = readSavedCourseCategories();
      setCategoryOptions(nextCategories);
      setCourse((current) => ({
        ...current,
        category: nextCategories.includes(current.category) ? current.category : nextCategories[0],
      }));
    }

    syncCategories();
    window.addEventListener("storage", syncCategories);
    window.addEventListener("course-categories-updated", syncCategories);

    return () => {
      window.removeEventListener("storage", syncCategories);
      window.removeEventListener("course-categories-updated", syncCategories);
    };
  }, []);

  function updateCourse(key: keyof typeof course, value: string | UploadFile | null) {
    setCourse((current) => ({ ...current, [key]: value }));
    setNotice("");
  }

  function handleThumbnail(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    updateCourse("thumbnail", {
      name: file.name,
      preview: file.type.startsWith("image/") ? URL.createObjectURL(file) : undefined,
    });
  }

  function validate() {
    const nextErrors: Record<string, string> = {};

    if (!course.title.trim()) nextErrors.title = "Course title is required.";
    if (!course.description.trim()) nextErrors.description = "Description is required.";
    if (!course.duration.trim()) nextErrors.duration = "Duration is required.";
    if (lessons.length === 0) nextErrors.lessons = "Add at least one lesson.";

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  function saveCourse(action: "draft" | "publish") {
    if (!validate()) return;

    setCourse((current) => ({ ...current, status: action === "publish" ? "Published" : "Draft" }));
    setNotice(action === "publish" ? "Course is ready to publish." : "Course draft saved.");
  }

  function goNext() {
    if (step === steps.length - 2 && !validate()) return;
    setStep((current) => Math.min(current + 1, steps.length - 1));
  }

  function goBack() {
    setStep((current) => Math.max(current - 1, 0));
  }

  function addLesson() {
    setLessons((current) => [...current, { id: Date.now(), type: "Text", title: "", textContent: "", videoFile: null }]);
  }

  function updateLesson(lessonId: number, key: keyof Lesson, value: string | UploadFile | null) {
    setLessons((current) => current.map((lesson) => (lesson.id === lessonId ? { ...lesson, [key]: value } : lesson)));
  }

  function removeLesson(lessonId: number) {
    setLessons((current) => current.filter((lesson) => lesson.id !== lessonId));
  }

  function handleLessonVideo(lessonId: number, event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    updateLesson(lessonId, "videoFile", {
      name: file.name,
      preview: file.type.startsWith("video/") ? URL.createObjectURL(file) : undefined,
    });
  }

  return (
    <div className="pb-24">
      {notice && (
        <div className="mb-5 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700">
          {notice}
        </div>
      )}

      <section className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <Link className="text-sm font-bold text-blue-600 hover:text-blue-700" href="/admin/courses">
            Back to courses
          </Link>
          <h1 className="mt-2 text-2xl font-bold tracking-[-0.02em] text-slate-950">Add Course</h1>
          <p className="mt-1 text-sm text-slate-500">Add only the details needed to create a course.</p>
        </div>
      </section>

      <nav className="mt-5 overflow-x-auto rounded-xl border border-slate-200 bg-white p-2 shadow-sm">
        <div className="flex min-w-[560px] gap-2">
          {steps.map((label, index) => (
            <button
              key={label}
              className={`flex flex-1 items-center justify-center rounded-lg px-3 py-2 text-xs font-bold transition ${
                step === index ? "bg-blue-600 text-white" : "text-slate-500 hover:bg-slate-50"
              }`}
              type="button"
              onClick={() => setStep(index)}
            >
              {index + 1}. {label}
            </button>
          ))}
        </div>
      </nav>

      <main className="mt-5">
        {step === 0 && (
          <FormCard title="Course Details">
            <div className="grid gap-4 lg:grid-cols-2">
              <Input label="Course title" required value={course.title} error={errors.title} onChange={(value) => updateCourse("title", value)} />
              <SelectField label="Category" value={course.category} options={categoryOptions} onChange={(value) => updateCourse("category", value)} />
              <Textarea label="Description" required value={course.description} error={errors.description} onChange={(value) => updateCourse("description", value)} />
              <SelectField label="Difficulty" value={course.difficulty} options={["Beginner", "Intermediate", "Advanced"]} onChange={(value) => updateCourse("difficulty", value)} />
              <Input label="Duration" required value={course.duration} error={errors.duration} placeholder="12 hours" onChange={(value) => updateCourse("duration", value)} />
              <Input label="Instructor name" value={course.instructor} placeholder="Type instructor name" onChange={(value) => updateCourse("instructor", value)} />
            </div>
          </FormCard>
        )}

        {step === 1 && (
          <FormCard title="Course Content">
            {errors.lessons && <p className="mb-3 text-sm font-semibold text-red-600">{errors.lessons}</p>}
            <div className="space-y-4">
              {lessons.map((lesson, lessonIndex) => (
                <div key={lesson.id} className="rounded-xl border border-slate-200 bg-white p-4">
                  <div className="grid gap-2 lg:grid-cols-[minmax(0,1fr)_150px_86px] lg:items-end">
                    <Input label={`Lesson ${lessonIndex + 1}`} value={lesson.title} onChange={(value) => updateLesson(lesson.id, "title", value)} />
                    <SelectField label="Lesson type" value={lesson.type} options={["Text", "Video", "Text and Video"]} onChange={(value) => updateLesson(lesson.id, "type", value)} />
                    <button
                      className="h-11 rounded-lg border border-slate-200 px-3 text-sm font-bold text-slate-600 transition hover:bg-slate-50"
                      type="button"
                      onClick={() => removeLesson(lesson.id)}
                    >
                      Delete
                    </button>
                  </div>
                  <div className="mt-3 grid gap-3">
                    {(lesson.type === "Video" || lesson.type === "Text and Video") && (
                      <VideoUpload file={lesson.videoFile} onUpload={(event) => handleLessonVideo(lesson.id, event)} />
                    )}
                    {(lesson.type === "Text" || lesson.type === "Text and Video") && (
                      <Textarea label="Lesson text" value={lesson.textContent} onChange={(value) => updateLesson(lesson.id, "textContent", value)} />
                    )}
                  </div>
                </div>
              ))}
              <button className="h-11 w-full rounded-lg border border-dashed border-blue-300 bg-blue-50 text-sm font-bold text-blue-700 transition hover:bg-blue-100" type="button" onClick={addLesson}>
                + Add lesson
              </button>
            </div>
          </FormCard>
        )}

        {step === 2 && (
          <div className="grid gap-5 xl:grid-cols-3">
          <FormCard title="Thumbnail">
            <label className="flex min-h-44 cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 bg-slate-50 p-4 text-center transition hover:border-blue-300 hover:bg-blue-50">
              {course.thumbnail?.preview ? (
                <span
                  aria-label={`${course.thumbnail.name} preview`}
                  className="h-28 w-full rounded-lg bg-cover bg-center"
                  role="img"
                  style={{ backgroundImage: `url(${course.thumbnail.preview})` }}
                />
              ) : (
                <UploadIcon />
              )}
              <span className="mt-3 text-sm font-bold text-slate-950">{course.thumbnail?.name || "Upload course thumbnail"}</span>
              <span className="mt-1 text-xs text-slate-500">Image shown in course list</span>
              <input accept="image/*" className="sr-only" type="file" onChange={handleThumbnail} />
            </label>
            {course.thumbnail && (
              <button className="mt-3 text-sm font-bold text-red-600" type="button" onClick={() => updateCourse("thumbnail", null)}>
                Remove thumbnail
              </button>
            )}
          </FormCard>

          <FormCard title="Pricing">
            <SelectField label="Access" value={course.priceType} options={["Free", "Paid"]} onChange={(value) => updateCourse("priceType", value)} />
          </FormCard>

          <FormCard title="Publish">
            <SelectField label="Status" value={course.status} options={["Draft", "Published"]} onChange={(value) => updateCourse("status", value)} />
          </FormCard>
          </div>
        )}

        {step === 3 && (
          <FormCard title="Summary">
            <div className="grid gap-4 lg:grid-cols-2">
              <SummaryRow label="Course title" value={course.title || "Not added"} />
              <SummaryRow label="Category" value={course.category} />
              <SummaryRow label="Difficulty" value={course.difficulty} />
              <SummaryRow label="Duration" value={course.duration || "Not added"} />
              <SummaryRow label="Instructor" value={course.instructor || "Not added"} />
              <SummaryRow label="Access" value={course.priceType} />
              <SummaryRow label="Status" value={course.status} />
              <SummaryRow label="Thumbnail" value={course.thumbnail?.name || "Not uploaded"} />
            </div>
            <div className="mt-5 rounded-xl border border-slate-200 bg-slate-50 p-4">
              <h3 className="text-sm font-bold text-slate-950">Lessons</h3>
              <div className="mt-3 space-y-2">
                {lessons.map((lesson, index) => (
                  <div key={lesson.id} className="flex flex-col gap-1 rounded-lg bg-white p-3 text-sm sm:flex-row sm:items-center sm:justify-between">
                    <span className="font-bold text-slate-950">
                      Lesson {index + 1}: {lesson.title || "Untitled lesson"}
                    </span>
                    <span className="text-xs font-semibold text-slate-500">
                      {lesson.type}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-5 flex flex-wrap justify-end gap-2">
              <Link className="h-10 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-slate-700" href="/admin/courses">
                Cancel
              </Link>
              <button className="h-10 rounded-lg border border-blue-200 bg-blue-50 px-4 text-sm font-bold text-blue-700" type="button" onClick={() => saveCourse("draft")}>
                Save Draft
              </button>
              <button className="h-10 rounded-lg bg-blue-600 px-4 text-sm font-bold text-white transition hover:bg-blue-700" type="button" onClick={() => saveCourse("publish")}>
                Publish Course
              </button>
            </div>
          </FormCard>
        )}
      </main>

      {step < steps.length - 1 && (
        <div className="mt-5 flex justify-end gap-2">
          {step > 0 && (
            <button className="h-10 rounded-lg border border-slate-200 bg-white px-4 text-sm font-bold text-slate-700" type="button" onClick={goBack}>
              Back
            </button>
          )}
          <button className="h-10 rounded-lg bg-blue-600 px-4 text-sm font-bold text-white transition hover:bg-blue-700" type="button" onClick={goNext}>
            Next
          </button>
        </div>
      )}
    </div>
  );
}

function FormCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="text-lg font-bold text-slate-950">{title}</h2>
      <div className="mt-4">{children}</div>
    </section>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
      <p className="text-xs font-bold text-slate-500">{label}</p>
      <p className="mt-1 text-sm font-bold text-slate-950">{value}</p>
    </div>
  );
}

function Input({
  label,
  value,
  onChange,
  required,
  error,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  error?: string;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span className="text-xs font-bold text-slate-500">
        {label}
        {required && <span className="text-red-600"> *</span>}
      </span>
      <input
        className="mt-1 h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-950 outline-none transition focus:border-blue-200 focus:ring-4 focus:ring-blue-600/10"
        placeholder={placeholder}
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
      {error && <span className="mt-1 block text-xs font-semibold text-red-600">{error}</span>}
    </label>
  );
}

function Textarea({ label, value, onChange, required, error }: { label: string; value: string; onChange: (value: string) => void; required?: boolean; error?: string }) {
  return (
    <label className="block lg:col-span-2">
      <span className="text-xs font-bold text-slate-500">
        {label}
        {required && <span className="text-red-600"> *</span>}
      </span>
      <textarea
        className="mt-1 min-h-28 w-full rounded-lg border border-slate-200 bg-white px-3 py-3 text-sm text-slate-950 outline-none transition focus:border-blue-200 focus:ring-4 focus:ring-blue-600/10"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
      {error && <span className="mt-1 block text-xs font-semibold text-red-600">{error}</span>}
    </label>
  );
}

function SelectField({ label, value, options, onChange }: { label: string; value: string; options: string[]; onChange: (value: string) => void }) {
  return (
    <label className="block">
      <span className="text-xs font-bold text-slate-500">{label}</span>
      <select
        className="mt-1 h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-950 outline-none transition focus:border-blue-200 focus:ring-4 focus:ring-blue-600/10"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      >
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
    </label>
  );
}

function VideoUpload({ file, onUpload }: { file: UploadFile | null; onUpload: (event: ChangeEvent<HTMLInputElement>) => void }) {
  return (
    <div>
      <p className="text-xs font-bold text-slate-500">Lesson video</p>
      <label className="mt-1 flex min-h-28 cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed border-slate-300 bg-slate-50 p-4 text-center transition hover:border-blue-300 hover:bg-blue-50">
        <VideoIcon />
        <span className="mt-2 text-sm font-bold text-slate-950">{file?.name || "Upload video from device"}</span>
        <span className="mt-1 text-xs text-slate-500">MP4, WebM, or MOV</span>
        <input accept="video/*" className="sr-only" type="file" onChange={onUpload} />
      </label>
    </div>
  );
}

function UploadIcon() {
  return (
    <svg aria-hidden="true" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24">
      <path d="M12 16V4m0 0 4 4m-4-4-4 4M5 16v3h14v-3" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
    </svg>
  );
}

function VideoIcon() {
  return (
    <svg aria-hidden="true" className="h-7 w-7 text-blue-600" fill="none" viewBox="0 0 24 24">
      <path d="M5 6.5A2.5 2.5 0 0 1 7.5 4h6A2.5 2.5 0 0 1 16 6.5v11a2.5 2.5 0 0 1-2.5 2.5h-6A2.5 2.5 0 0 1 5 17.5v-11Zm11 3.75 4-2.25v8l-4-2.25" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
    </svg>
  );
}
