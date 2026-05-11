import { Card, GameState, Lane, LaneKey, Player, PlayerId } from "../types";

import { lanePool } from "@/data/lanes";

function createPlayer(playerId: PlayerId, deck: Card[]): Player {
  return {
    id: playerId,

    deck,

    hand: [],

    board: {
      lane1: [],
      lane2: [],
      lane3: [],
    },

    energy: 0,

    bonusEnergy: 0,
  };
}

function generateGameLanes(): Lane[] {
  const shuffledLanes = [...lanePool].sort(() => Math.random() - 0.5);

  const laneKeys: LaneKey[] = ["lane1", "lane2", "lane3"];

  return laneKeys.map((laneId, index) => ({
    id: laneId,

    name: shuffledLanes[index].name,

    effect: shuffledLanes[index].effect,

    trigger: shuffledLanes[index].trigger,

    revealed: index === 0,
  }));
}

export function createGameState(
  playerOneDeck: Card[],
  playerTwoDeck: Card[],
): GameState {
  return {
    turn: 1,

    currentPhase: "start",

    revealPriority: Math.random() > 0.5 ? "player1" : "player2",

    maxTurns: 6,

    lanes: generateGameLanes(),

    players: {
      player1: createPlayer("player1", playerOneDeck),

      player2: createPlayer("player2", playerTwoDeck),
    },
  };
}
