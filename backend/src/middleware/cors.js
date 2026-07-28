import { env } from "../config/env.js";

export function corsMiddleware(req, res, next) {
  const requestOrigin = req.headers.origin;

  if (!requestOrigin || env.frontendOrigins.includes(requestOrigin)) {
    res.setHeader("Access-Control-Allow-Origin", requestOrigin || env.frontendOrigins[0]);
  }

  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, OPTIONS");

  if (req.method === "OPTIONS") return res.sendStatus(204);
  return next();
}
