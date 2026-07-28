"use client";

import { useEffect, useState } from "react";
import { fetchCompletedLessons, markLessonComplete, readCompletedLessons } from "../../../../../../lib/courseProgress";
import { showToast } from "../../../../../../lib/toast";

export default function MarkAsReadButton({ courseSlug, lessonIndex }: { courseSlug: string; lessonIndex: number }) {
  const [isRead, setIsRead] = useState(false);

  useEffect(() => {
    async function updateReadState() {
      try {
        const completedLessons = await fetchCompletedLessons(courseSlug);
        setIsRead(completedLessons.includes(lessonIndex));
      } catch {
        setIsRead(readCompletedLessons(courseSlug).includes(lessonIndex));
      }
    }

    updateReadState();
  }, [courseSlug, lessonIndex]);

  async function handleMarkAsRead() {
    const progress = await markLessonComplete(courseSlug, lessonIndex);
    setIsRead(true);
    showToast(progress.certificate ? "Course completed. Certificate unlocked." : "Lesson marked as read.");
  }

  return (
    <button
      className={`inline-flex h-11 items-center justify-center gap-2 rounded-lg px-5 text-sm font-bold text-white transition ${
        isRead ? "bg-emerald-600 hover:bg-emerald-700" : "bg-blue-600 hover:bg-blue-700"
      }`}
      type="button"
      onClick={handleMarkAsRead}
    >
      <CheckIcon />
      {isRead ? "Marked as Read" : "Mark as Read"}
    </button>
  );
}

function CheckIcon() {
  return (
    <svg aria-hidden="true" className="h-4 w-4" fill="none" viewBox="0 0 24 24">
      <path
        d="m5 12 4 4L19 6"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2.5"
      />
    </svg>
  );
}
