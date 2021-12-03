import { ErrorRequestHandler } from 'express';

export const checkHealth = (req, res) => {
  res.status(200).json({
    status: 'success',
  });
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  if (req.originalUrl.startsWith('/api')) {
    return res.status(err.status || 400).json({
      status: 'error',
      message: err.message || 'Bad Request',
    });
  }
  return res.status(404).send('Page not found');
};
