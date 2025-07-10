import express from 'express';
import { Game } from '../models/Game';

const router = express.Router();

// get all games
router.get('/', async (req, res) => {
  try {
    const games = await Game.find().sort({ createdAt: -1 });
    res.json(games);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch games' });
  }
});

// post 
router.post('/', async (req, res) => {
  console.log('Incoming POST /api/games', req.body);
  try {
    const newGame = new Game(req.body);
    const saved = await newGame.save();
    console.log('Game saved to DB:', saved);

    res.status(201).json(saved);
  } catch (err) {
    console.error('Error saving game:', err);
    res.status(500).json({ message: 'Failed to save game' });
  }
});

// delete 
router.delete('/:id', async (req, res) => {
  try {
    const deletedGame = await Game.findByIdAndDelete(req.params.id);
    if (!deletedGame) {
      return res.status(404).json({ message: 'Game not found' });
    }
    res.json({ message: 'Game deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete game' });
  }
});

export default router;
