import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import taskRoutes from './routes/taskRoutes.js';
import { errorHandler, notFound } from './middleware/errorHandler.js';

const app = express();

const PORT = process.env.PORT || 5000;

// Allowed frontend origins
const allowedOrigins = [
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  'https://tj-tasks-2026-laxman-panigrahi.vercel.app',
  process.env.CLIENT_URL
].filter(Boolean);

// CORS configuration
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests without an Origin header
      // (Postman, server-to-server requests, etc.)
      if (!origin) {
        return callback(null, true);
      }

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(
        new Error(`CORS blocked origin: ${origin}`),
        false
      );
    },
    credentials: false
  })
);

// Body parsers
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));

// Health check
app.get('/api/health', (_req, res) => {
  res.json({
    success: true,
    message: 'TaskFlow API is running',
    timestamp: new Date().toISOString()
  });
});

// Task routes
app.use('/api/tasks', taskRoutes);

// 404 handler
app.use(notFound);

// Error handler
app.use(errorHandler);

// Start server
const startServer = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI is not configured.');
    }

    await mongoose.connect(process.env.MONGODB_URI);

    console.log('MongoDB connected');

    app.listen(PORT, '0.0.0.0', () => {
      console.log(`TaskFlow API listening on port ${PORT}`);
    });
  } catch (error) {
    console.error('Startup failed:', error.message);
    process.exit(1);
  }
};

startServer();
