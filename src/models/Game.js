"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const RoundSchema = new mongoose_1.default.Schema({
    winner: String,
    board: [[String]],
});
const GameSchema = new mongoose_1.default.Schema({
    player1: String,
    player2: String,
    rounds: [RoundSchema],
    createdAt: { type: Date, default: Date.now },
});
exports.Game = mongoose_1.default.model('Game', GameSchema);
