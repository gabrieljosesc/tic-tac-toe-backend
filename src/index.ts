import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import gameRoutes from './routes/gameRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const mongoUri = process.env.MONGO_URI;

if (!mongoUri) {
  console.error("MONGO_URI not found in environment variables");
  process.exit(1);
}

mongoose
  .connect(mongoUri)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });