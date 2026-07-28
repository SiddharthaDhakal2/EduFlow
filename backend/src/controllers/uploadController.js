import { httpError } from "../middleware/errorHandler.js";
import { saveAdminMedia, saveProfileImage } from "../services/uploadService.js";

export async function profileImage(req, res, next) {
  try {
    if (!req.file) throw httpError(400, "Profile image is required.");
    res.json({ user: await saveProfileImage(req.db, req.user, req.file) });
  } catch (error) {
    next(error);
  }
}

export function adminMedia(req, res, next) {
  try {
    if (!req.file) throw httpError(400, "File is required.");
    res.status(201).json({ file: saveAdminMedia(req.file) });
  } catch (error) {
    next(error);
  }
}
