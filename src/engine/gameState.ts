import { GameState, Player, Card } from "./types";
import { lanePool } from "../data/lanes";

function createPlayer(id: "player1" | "player2", deck: Card[]): Player {
  return {
    id,
    deck,
    hand: [],
    board: {
      lane1: [],
      lane2: [],
      lane3: [],
    },
    energy: 0,
  };
}

export function createGameState(deck1: Card[], deck2: Card[]): GameState {
  return {
    turn: 1,
    phase: "start",
    priorityPlayer: Math.random() > 0.5 ? "player1" : "player2",
    maxTurns: 6,
    lanes: lanePool, // ✅ now correct
    players: {
      player1: createPlayer("player1", deck1),
      player2: createPlayer("player2", deck2),
    },
  };
}
