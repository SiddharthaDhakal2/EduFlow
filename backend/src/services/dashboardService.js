import { courseWithCounts } from "./courseService.js";
import { publicUser } from "../utils/format.js";

export function getUserDashboard(db, user) {
  const enrollments = db.enrollments.filter((item) => item.userId === user.id);
  const completed = enrollments.filter((enrollment) => {
    const course = db.courses.find((item) => item.slug === enrollment.courseSlug);
    return course && enrollment.completedLessons.length >= course.lessonItems.length;
  }).length;
  const membership = db.memberships.find((item) => item.userId === user.id) || { active: false };
  const recentCourses = db.courses
    .filter((course) => course.status === "Published")
    .slice(-3)
    .reverse()
    .map((course) => courseWithCounts(db, course));

  return {
    user: publicUser(user),
    stats: {
      total: enrollments.length,
      completed,
      inProgress: Math.max(enrollments.length - completed, 0),
    },
    membership,
    recentCourses,
  };
}
