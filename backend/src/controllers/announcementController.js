import { createAnnouncement, deleteAnnouncement, listAnnouncements, updateAnnouncement } from "../services/announcementService.js";

export async function index(req, res) {
  res.json({ announcements: await listAnnouncements({ includeDrafts: req.query.includeDrafts === "true" }) });
}

export async function store(req, res, next) {
  try {
    res.status(201).json({ announcement: await createAnnouncement(req.db, req.body) });
  } catch (error) {
    next(error);
  }
}

export async function update(req, res, next) {
  try {
    res.json({ announcement: await updateAnnouncement(req.db, req.params.id, req.body) });
  } catch (error) {
    next(error);
  }
}

export async function destroy(req, res) {
  await deleteAnnouncement(req.db, req.params.id);
  res.json({ message: "Announcement deleted." });
}
