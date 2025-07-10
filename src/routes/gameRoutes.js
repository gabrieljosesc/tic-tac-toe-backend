"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Game_1 = require("../models/Game");
const router = express_1.default.Router();
// get all games
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const games = yield Game_1.Game.find().sort({ createdAt: -1 });
        res.json(games);
    }
    catch (err) {
        res.status(500).json({ message: 'Failed to fetch games' });
    }
}));
// post new game
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('Incoming POST /api/games', req.body);
    try {
        const newGame = new Game_1.Game(req.body);
        yield newGame.save();
        console.log('Game saved!');
        res.status(201).json(newGame);
    }
    catch (err) {
        console.error('Error saving game:', err);
        res.status(500).json({ message: 'Failed to save game' });
    }
}));
// delete 
router.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedGame = yield Game_1.Game.findByIdAndDelete(req.params.id);
        if (!deletedGame) {
            return res.status(404).json({ message: 'Game not found' });
        }
        res.json({ message: 'Game deleted' });
    }
    catch (err) {
        res.status(500).json({ message: 'Failed to delete game' });
    }
}));
exports.default = router;
