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

// post new game
router.post('/', async (req, res) => {
  try {
    const newGame = new Game(req.body);
    await newGame.save();
    res.status(201).json(newGame);
  } catch (err) {
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
