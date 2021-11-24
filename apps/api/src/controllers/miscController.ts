export const checkHealth = (req, res) => {
  res.status(200).json({
    status: 'success'
  });
};

export const errorHandler = (req, res) => {
  if (req.originalUrl.startsWith('/api')) {
    return res.status(401).json({
      status: 'error',
      message: 'Invalid API route'
    })
  }
  return res.status(404).send('Page not found')
}
