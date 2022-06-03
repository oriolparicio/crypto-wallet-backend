class APIError extends Error {
  constructor(message, statusCode, error) {
    super(message);
    this.error = error;
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;

    if (process.env.NODE_ENV === 'development') {
      if (error) console.log(error);
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export default APIError;
