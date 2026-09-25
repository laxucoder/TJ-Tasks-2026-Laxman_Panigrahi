import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import taskRoutes from './routes/taskRoutes.js';
import { errorHandler, notFound } from './middleware/errorHandler.js';

const app = express();
const PORT = process.env.PORT || 5000;
const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:5173';

app.use(cors({ origin: CLIENT_URL, credentials: false }));
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));

app.get('/api/health', (_req, res) => {
  res.json({ success: true, message: 'TaskFlow API is running', timestamp: new Date().toISOString() });
});
app.use('/api/tasks', taskRoutes);
app.use(notFound);
app.use(errorHandler);

const startServer = async () => {
  if (!process.env.MONGODB_URI) throw new Error('MONGODB_URI is not configured.');
  await mongoose.connect(process.env.MONGODB_URI);
  console.log('MongoDB connected');
  app.listen(PORT, () => console.log(`TaskFlow API listening on http://localhost:${PORT}`));
};

startServer().catch((error) => {
  console.error('Startup failed:', error.message);
  process.exit(1);
});
