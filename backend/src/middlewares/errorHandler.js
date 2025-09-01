// eslint-disable-next-line no-unused-vars
export function errorHandler(err, req, res, next) {
  const status = err.status || 500;
  res.status(status).json({
    ok: false,
    error: err.expose ? err.message : "Internal Server Error"
  });
}
