export const notFound = (req, res) => {
  res.status(404).json({ success: false, message: `Route not found: ${req.method} ${req.originalUrl}` });
};

export const errorHandler = (error, _req, res, _next) => {
  console.error(error);
  if (error.name === 'ValidationError') {
    return res.status(400).json({ success: false, message: Object.values(error.errors).map((e) => e.message).join(' ') });
  }
  if (error.name === 'CastError') return res.status(400).json({ success: false, message: 'Invalid data format.' });
  res.status(500).json({ success: false, message: 'Internal server error.' });
};
