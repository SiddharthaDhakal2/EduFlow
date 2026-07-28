import { writeDb } from "../database/jsonDb.js";
import { publicUser } from "../utils/format.js";

function publicUploadPath(folder, filename) {
  return `/uploads/${folder}/${filename}`;
}

export async function saveProfileImage(db, user, file) {
  user.profileImage = publicUploadPath("user", file.filename);
  await writeDb(db);
  return publicUser(user);
}

export function saveAdminMedia(file) {
  return {
    url: publicUploadPath("admin", file.filename),
    filename: file.filename,
    originalName: file.originalname,
    mimetype: file.mimetype,
    size: file.size,
  };
}
