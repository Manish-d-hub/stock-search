export default (err, req, res, next) => {
  const { statusCode = 500 } = err;
  if (!err.message) {
    err.message = 'Something went wrong!';
  }

  if (process.env.NODE_ENV === 'production') {
    return res.status(statusCode).json({
      error: err,
    });
  }
  return res.status(statusCode).json({
    error: err,
    stack: err.stack,
  });
};
