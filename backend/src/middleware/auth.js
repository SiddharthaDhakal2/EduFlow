import { readDb } from "../database/jsonDb.js";
import { findSessionUserId } from "../services/sessionService.js";

export async function requireAuth(req, res, next) {
  const token = req.headers.authorization?.replace("Bearer ", "");
  const db = await readDb();
  const userId = token ? await findSessionUserId(db, token) : null;

  if (!userId) {
    return res.status(401).json({ message: "Authentication required." });
  }

  const user = db.users.find((item) => item.id === userId);

  if (!user) {
    return res.status(401).json({ message: "Invalid session." });
  }

  req.db = db;
  req.user = user;
  return next();
}

export async function optionalAuth(req, res, next) {
  const token = req.headers.authorization?.replace("Bearer ", "");
  if (!token) return next();

  const db = await readDb();
  const userId = await findSessionUserId(db, token);
  const user = userId ? db.users.find((item) => item.id === userId) : null;

  if (user) {
    req.db = db;
    req.user = user;
  }

  return next();
}

export function requireAdmin(req, res, next) {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Admin access required." });
  }

  return next();
}
