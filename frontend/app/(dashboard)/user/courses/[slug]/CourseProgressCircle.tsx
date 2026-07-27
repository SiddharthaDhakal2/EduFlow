"use client";

import { useEffect, useMemo, useState } from "react";
import { readCompletedLessons } from "../../../../lib/courseProgress";

export default function CourseProgressCircle({ courseSlug, totalLessons }: { courseSlug: string; totalLessons: number }) {
  const [completedCount, setCompletedCount] = useState(0);

  useEffect(() => {
    function updateProgress() {
      setCompletedCount(readCompletedLessons(courseSlug).length);
    }

    updateProgress();
    window.addEventListener("course-progress-updated", updateProgress);
    window.addEventListener("storage", updateProgress);

    return () => {
      window.removeEventListener("course-progress-updated", updateProgress);
      window.removeEventListener("storage", updateProgress);
    };
  }, [courseSlug]);

  const percent = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;
  const progressStyle = useMemo(
    () => ({ background: `conic-gradient(#2563eb ${percent * 3.6}deg, #e5eefc 0deg)` }),
    [percent],
  );

  return (
    <div className="mt-5 flex items-center gap-4 rounded-xl border border-blue-100 bg-blue-50/50 p-4">
      <div
        className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full"
        style={progressStyle}
      >
        <div className="flex h-[74px] w-[74px] items-center justify-center rounded-full bg-white">
          <span className="text-xl font-bold text-slate-950">{percent}%</span>
        </div>
      </div>

      <div>
        <h2 className="text-sm font-bold text-slate-950">Course Progress</h2>
        <p className="mt-1 text-sm text-slate-500">
          {completedCount} of {totalLessons} lessons completed
        </p>
      </div>
    </div>
  );
}
