import { readDb, writeDb } from "../database/jsonDb.js";
import { httpError } from "../middleware/errorHandler.js";
import { displayDate } from "../utils/format.js";

export async function listAnnouncements({ includeDrafts = false } = {}) {
  const db = await readDb();
  return db.announcements.filter((item) => includeDrafts || item.status === "Published");
}

export async function createAnnouncement(db, payload) {
  if (!payload.title || !payload.message) throw httpError(400, "Title and message are required.");

  const announcement = {
    id: Date.now(),
    title: payload.title,
    audience: payload.audience,
    status: payload.status || "Draft",
    pinned: Boolean(payload.pinned),
    message: payload.message,
    date: displayDate(),
  };

  db.announcements.unshift(announcement);
  await writeDb(db);
  return announcement;
}

export async function updateAnnouncement(db, id, payload) {
  const announcement = db.announcements.find((item) => item.id === Number(id));
  if (!announcement) throw httpError(404, "Announcement not found.");

  Object.assign(announcement, payload);
  await writeDb(db);
  return announcement;
}

export async function deleteAnnouncement(db, id) {
  db.announcements = db.announcements.filter((item) => item.id !== Number(id));
  return writeDb(db);
}
