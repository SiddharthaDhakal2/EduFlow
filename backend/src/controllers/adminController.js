import { listAdminTransactions, listAdminUsers } from "../services/adminService.js";

export function users(req, res) {
  res.json({ users: listAdminUsers(req.db) });
}

export function transactions(req, res) {
  res.json({ transactions: listAdminTransactions(req.db) });
}
