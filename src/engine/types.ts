export type LaneKey = "lane1" | "lane2" | "lane3";

export interface Card {
  id: string;
  name: string;

  cost: number;

  // BASE stats (never directly shown logic-wise)
  basePower: number;

  // dynamic computed value
  power: number;

  // temporary modifiers only
  modifier: number;

  revealed?: boolean;
  queued?: boolean;

  effect?: "onPlay" | "onReveal" | "ongoing" | null;

  ability?: string;

  description?: string;

  buffed?: boolean;
  debuffed?: boolean;
}

export interface Player {
  id: "player1" | "player2";

  deck: Card[];
  hand: Card[];

  board: Record<LaneKey, Card[]>;

  energy: number;
  bonusEnergy: number;
}

export interface Lane {
  id: LaneKey;
  name: string;

  effect?: string;

  trigger?: "onReveal" | "eachTurn" | "turn5" | "endGame" | "ongoing";

  revealed: boolean;
}

export interface GameState {
  turn: number;
  priorityPlayer: "player1" | "player2";
  phase: "start" | "player" | "enemy" | "resolve" | "postResolve" | "end";

  players: Record<"player1" | "player2", Player>;

  lanes: Lane[];

  maxTurns: number;
}
