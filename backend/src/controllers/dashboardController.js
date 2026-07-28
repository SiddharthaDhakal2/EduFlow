import { getAdminDashboard } from "../services/adminService.js";
import { getUserDashboard } from "../services/dashboardService.js";

export function userDashboard(req, res) {
  res.json(getUserDashboard(req.db, req.user));
}

export function adminDashboard(req, res) {
  res.json(getAdminDashboard(req.db));
}
