export type LaneKey = "lane1" | "lane2" | "lane3";

export interface Card {
  id: string;
  name: string;
  cost: number;
  power: number;
  effect?: "onPlay" | "onReveal" | "ongoing" | null;
  ability?: string; // actual logic trigger

  laneBuffApplied?: boolean;
}

export interface Player {
  id: "player1" | "player2";
  deck: Card[];
  hand: Card[];
  board: Record<LaneKey, Card[]>;
  energy: number;
}

export interface GameState {
  turn: number;
  priorityPlayer: "player1" | "player2";
  phase: "start" | "player" | "enemy" | "resolve" | "end";
  players: Record<"player1" | "player2", Player>;
  lanes: Lane[];
  maxTurns: number;
}

export interface Lane {
  id: LaneKey;
  name: string;
  effect?: string;
  revealed: boolean; // 👈 NEW
}
