import { getMembership } from "../services/membershipService.js";
import { initiateKhaltiMembership, verifyKhaltiMembership } from "../services/khaltiService.js";

export function show(req, res) {
  res.json(getMembership(req.db, req.user));
}

export async function initiateKhalti(req, res, next) {
  try {
    res.status(201).json(await initiateKhaltiMembership(req.db, req.user, req.body, req.headers.origin));
  } catch (error) {
    next(error);
  }
}

export async function verifyKhalti(req, res, next) {
  try {
    res.json(await verifyKhaltiMembership(req.db, req.user, req.body));
  } catch (error) {
    next(error);
  }
}
