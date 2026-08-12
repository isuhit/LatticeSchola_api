const handleError = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (err.name === "CastError" && err.kind === "ObjectId") {
    err.statusCode = 400;
    err.message = "Invalid ID format";
  }

  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};

module.exports = {
  handleError,
};
