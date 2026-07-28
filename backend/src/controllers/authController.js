import { publicUser } from "../utils/format.js";
import { loginUser, logoutUser, registerUser, updatePassword, updateProfile } from "../services/authService.js";

export async function register(req, res, next) {
  try {
    res.status(201).json(await registerUser(req.body));
  } catch (error) {
    next(error);
  }
}

export async function login(req, res, next) {
  try {
    res.json(await loginUser(req.body));
  } catch (error) {
    next(error);
  }
}

export function me(req, res) {
  res.json({ user: publicUser(req.user) });
}

export async function saveProfile(req, res, next) {
  try {
    res.json({ user: await updateProfile(req.db, req.user, req.body) });
  } catch (error) {
    next(error);
  }
}

export async function changePassword(req, res, next) {
  try {
    await updatePassword(req.db, req.user, req.body);
    res.json({ message: "Password updated." });
  } catch (error) {
    next(error);
  }
}

export async function logout(req, res, next) {
  try {
    const token = req.headers.authorization?.replace("Bearer ", "");
    await logoutUser(req.db, token);
    res.json({ message: "Logged out successfully." });
  } catch (error) {
    next(error);
  }
}
