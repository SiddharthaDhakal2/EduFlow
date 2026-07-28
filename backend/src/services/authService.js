import { readDb, writeDb } from "../database/jsonDb.js";
import { createSession, deleteSession } from "./sessionService.js";
import { createToken, hashPassword } from "../utils/password.js";
import { displayDateTime, publicUser } from "../utils/format.js";
import { httpError } from "../middleware/errorHandler.js";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function registerUser({ name, email, password }) {
  const trimmedName = String(name || "").trim();
  const normalizedEmail = String(email || "").trim().toLowerCase();
  const plainPassword = String(password || "");

  if (!trimmedName || !normalizedEmail || !plainPassword.trim()) {
    throw httpError(400, "Name, email, and password are required.");
  }

  if (!emailPattern.test(normalizedEmail)) {
    throw httpError(400, "Please enter a valid email address.");
  }

  if (plainPassword.length < 6) {
    throw httpError(400, "Password must be at least 6 characters.");
  }

  const db = await readDb();

  if (db.users.some((user) => user.email.toLowerCase() === normalizedEmail)) {
    throw httpError(409, "An account with this email already exists.");
  }

  const nextId = Math.max(...db.users.map((user) => user.id), 0) + 1;
  const user = {
    id: nextId,
    name: trimmedName,
    email: normalizedEmail,
    passwordHash: hashPassword(plainPassword),
    role: "user",
    profileImage: null,
    createdAt: new Date().toISOString().slice(0, 10),
    recentLogin: null,
  };

  db.users.push(user);
  await writeDb(db);

  const token = createToken();
  await createSession(db, token, user.id);
  return { token, user: publicUser(user) };
}

export async function loginUser({ email, password }) {
  const db = await readDb();
  const user = db.users.find((item) => item.email.toLowerCase() === String(email || "").toLowerCase());

  if (!user || user.passwordHash !== hashPassword(password)) {
    throw httpError(401, "Invalid email or password.");
  }

  user.recentLogin = displayDateTime();
  await writeDb(db);

  const token = createToken();
  await createSession(db, token, user.id);
  return { token, user: publicUser(user) };
}

export async function updateProfile(db, currentUser, { name, email }) {
  const trimmedName = String(name || "").trim();
  const normalizedEmail = String(email || "").trim().toLowerCase();

  if (!trimmedName || !normalizedEmail) {
    throw httpError(400, "Name and email are required.");
  }

  if (!emailPattern.test(normalizedEmail)) {
    throw httpError(400, "Please enter a valid email address.");
  }

  if (db.users.some((user) => user.id !== currentUser.id && user.email.toLowerCase() === normalizedEmail)) {
    throw httpError(409, "Email is already in use.");
  }

  currentUser.name = trimmedName;
  currentUser.email = normalizedEmail;
  await writeDb(db);
  return publicUser(currentUser);
}

export async function updatePassword(db, currentUser, { currentPassword, newPassword }) {
  if (!String(currentPassword || "").trim() || !String(newPassword || "").trim()) {
    throw httpError(400, "Current password and new password are required.");
  }

  if (currentUser.passwordHash !== hashPassword(currentPassword)) {
    throw httpError(400, "Current password is incorrect.");
  }

  if (String(newPassword).length < 6) {
    throw httpError(400, "New password must be at least 6 characters.");
  }

  currentUser.passwordHash = hashPassword(newPassword);
  return writeDb(db);
}

export async function logoutUser(db, token) {
  if (token) {
    await deleteSession(db, token);
  }
}
