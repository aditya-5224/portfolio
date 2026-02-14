const errorHandler = (err, req, res, next) => {
  // Default error values
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Internal Server Error';
  let details = null;

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    statusCode = 400;
    message = 'Validation Failed';
    details = Object.values(err.errors).map(e => e.message);
  }

  // Mongoose duplicate key error
  if (err.code === 11000) {
    statusCode = 400;
    message = 'Duplicate field value entered';
    const field = Object.keys(err.keyValue)[0];
    details = `${field} already exists`;
  }

  // Mongoose CastError
  if (err.name === 'CastError') {
    statusCode = 400;
    message = 'Invalid ID format';
    details = err.value;
  }

  // Application-specific errors
  if (err.isOperational) {
    return res.status(statusCode).json({
      success: false,
      message: message,
      details: details
    });
  }

  // Programming or unknown error
  console.error('Unexpected error:', err);
  res.status(statusCode).json({
    success: false,
    message: 'Something went wrong on the server',
    ...(process.env.NODE_ENV === 'development' && { error: err.message })
  });
};

module.exports = errorHandler;
