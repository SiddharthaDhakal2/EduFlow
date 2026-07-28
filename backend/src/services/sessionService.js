import { writeDb } from "../database/jsonDb.js";

const sessionDurationMs = 1000 * 60 * 60 * 24 * 7;

export async function createSession(db, token, userId) {
  const now = new Date();
  db.sessions = (db.sessions || []).filter((session) => new Date(session.expiresAt).getTime() > now.getTime());
  db.sessions.push({
    token,
    userId,
    createdAt: now.toISOString(),
    expiresAt: new Date(now.getTime() + sessionDurationMs).toISOString(),
  });
  await writeDb(db);
}

export async function findSessionUserId(db, token) {
  const now = Date.now();
  const sessions = db.sessions || [];
  const session = sessions.find((item) => item.token === token);

  if (!session) return null;

  if (new Date(session.expiresAt).getTime() <= now) {
    db.sessions = sessions.filter((item) => item.token !== token);
    await writeDb(db);
    return null;
  }

  return session.userId;
}

export async function deleteSession(db, token) {
  db.sessions = (db.sessions || []).filter((session) => session.token !== token);
  await writeDb(db);
}
