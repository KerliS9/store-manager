const errorHandler = (err, _req, res, _next) => {
  if (err.statusCode) {
    return res.status(err.statusCode).json({ message: err.message });
  }
  if (err.isJoi) {
    return {
      statusCode: err.status,
      message: err.details[0].message,
    };
  }
  return res.status(500).json({ message: 'Internal server error' });
};

module.exports = {
  errorHandler,
};