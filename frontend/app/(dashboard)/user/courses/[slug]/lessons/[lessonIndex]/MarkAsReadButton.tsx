"use client";

import { useEffect, useState } from "react";
import { markLessonComplete, readCompletedLessons } from "../../../../../../lib/courseProgress";

export default function MarkAsReadButton({ courseSlug, lessonIndex }: { courseSlug: string; lessonIndex: number }) {
  const [isRead, setIsRead] = useState(false);

  useEffect(() => {
    function updateReadState() {
      setIsRead(readCompletedLessons(courseSlug).includes(lessonIndex));
    }

    updateReadState();
  }, [courseSlug, lessonIndex]);

  function handleMarkAsRead() {
    markLessonComplete(courseSlug, lessonIndex);
    setIsRead(true);
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
