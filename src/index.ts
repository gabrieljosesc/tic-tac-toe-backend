import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import gameRoutes from './routes/gameRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error('MONGO_URI not found in environment variables');
  process.exit(1);
}

app.use(cors());
app.use(express.json());

app.use('/api/games', gameRoutes);

mongoose
  .connect(MONGO_URI)
  .then(async () => {
    console.log('Connected to MongoDB');

    const db = mongoose.connection;
    console.log('Current DB name:', db.name); // should be "tictactoe"

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });