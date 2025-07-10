import mongoose from 'mongoose';

const RoundSchema = new mongoose.Schema({
  winner: String,
  board: [[String]],
});

const GameSchema = new mongoose.Schema({
  player1: String,
  player2: String,
  rounds: [RoundSchema],
  createdAt: { type: Date, default: Date.now },
});

export const Game = mongoose.model('Game', GameSchema);
