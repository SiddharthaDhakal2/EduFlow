import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import multer from "multer";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
export const uploadsRoot = path.resolve(__dirname, "../../uploads");

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function safeName(name) {
  return String(name || "file").replace(/[^a-zA-Z0-9._-]/g, "-");
}

function storageFor(folder) {
  const destination = path.join(uploadsRoot, folder);
  ensureDir(destination);

  return multer.diskStorage({
    destination,
    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname);
      const base = path.basename(file.originalname, ext);
      cb(null, `${Date.now()}-${safeName(base)}${ext.toLowerCase()}`);
    },
  });
}

export const userProfileUpload = multer({
  storage: storageFor("user"),
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith("image/")) return cb(new Error("Only image files are allowed."));
    cb(null, true);
  },
});

export const adminMediaUpload = multer({
  storage: storageFor("admin"),
  limits: { fileSize: 200 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith("image/") && !file.mimetype.startsWith("video/")) {
      return cb(new Error("Only image and video files are allowed."));
    }
    cb(null, true);
  },
});

export const adminCourseUpload = multer({
  storage: storageFor("admin"),
  limits: { fileSize: 200 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith("image/") && !file.mimetype.startsWith("video/")) {
      return cb(new Error("Only image and video files are allowed."));
    }
    cb(null, true);
  },
});
