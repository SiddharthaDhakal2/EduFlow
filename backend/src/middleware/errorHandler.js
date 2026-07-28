export function notFound(req, res) {
  res.status(404).json({ message: "Route not found." });
}

export function errorHandler(err, req, res, next) {
  const status = err.status || 500;
  if (err.name === "MulterError") {
    return res.status(400).json({ message: err.message });
  }
  res.status(status).json({ message: err.message || "Internal server error." });
}

export function httpError(status, message) {
  const error = new Error(message);
  error.status = status;
  return error;
}
