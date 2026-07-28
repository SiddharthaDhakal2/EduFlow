import { createSeedDb, seedCourses, seedFeaturedCourses } from "../data/seed.js";
import { Store } from "./mongo.js";

const storeKey = "eduflow";
const removeAdminDemoDataMigration = "remove-admin-demo-data-2026-07-28";
const demoAnnouncementTitles = new Set([
  "New Course: Flutter App Development",
  "Platform Maintenance Scheduled",
  "Python Course Update",
  "Instructor Webinar Draft",
]);

export async function readDb() {
  let store = await Store.findOne({ key: storeKey }).lean();

  if (!store) {
    const data = createSeedDb();
    await Store.create({ key: storeKey, data });
    return data;
  }

  const db = store.data;
  let changed = false;

  if (!db.featuredCourses) {
    db.featuredCourses = seedFeaturedCourses;
    changed = true;
  }

  if (!db.khaltiPayments) {
    db.khaltiPayments = [];
    changed = true;
  }

  if (!Array.isArray(db.sessions)) {
    db.sessions = [];
    changed = true;
  }

  db.users?.forEach((user) => {
    if (!Object.prototype.hasOwnProperty.call(user, "profileImage")) {
      user.profileImage = null;
      changed = true;
    }
  });

  if (!Array.isArray(db.migrations)) {
    db.migrations = [];
    changed = true;
  }

  if (!db.migrations.includes(removeAdminDemoDataMigration)) {
    const seedCourseSlugs = new Set(seedCourses.map((course) => course.slug));

    db.users = (db.users || []).filter((user) => user.email !== "student@eduflow.com");
    db.courses = (db.courses || []).filter((course) => !seedCourseSlugs.has(course.slug));
    db.memberships = (db.memberships || []).filter((membership) => membership.userId !== 2);
    db.enrollments = (db.enrollments || []).filter(
      (enrollment) => enrollment.userId !== 2 && !seedCourseSlugs.has(enrollment.courseSlug),
    );
    db.announcements = (db.announcements || []).filter((announcement) => !demoAnnouncementTitles.has(announcement.title));
    db.transactions = (db.transactions || []).filter((transaction) => !String(transaction.id).startsWith("TXN-240"));
    db.migrations.push(removeAdminDemoDataMigration);
    changed = true;
  }

  if (changed) await writeDb(db);
  return db;
}

export async function writeDb(db) {
  await Store.updateOne({ key: storeKey }, { $set: { data: db } }, { upsert: true });
}
