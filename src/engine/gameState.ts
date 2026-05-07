import { GameState, Player, Card, Lane, LaneKey } from "./types";
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

function getRandomLanes(): Lane[] {
  const shuffled = [...lanePool].sort(() => Math.random() - 0.5);

  return (["lane1", "lane2", "lane3"] as LaneKey[]).map((laneKey, i) => ({
    id: laneKey,
    name: shuffled[i].name,
    effect: shuffled[i].effect,
    revealed: i === 0, // only first revealed
  }));
}

export function createGameState(deck1: Card[], deck2: Card[]): GameState {
  return {
    turn: 1,
    phase: "start",
    priorityPlayer: Math.random() > 0.5 ? "player1" : "player2",
    maxTurns: 6,
    lanes: getRandomLanes(),
    players: {
      player1: createPlayer("player1", deck1),
      player2: createPlayer("player2", deck2),
    },
  };
}
