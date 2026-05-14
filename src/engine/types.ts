export type PlayerId = "player1" | "player2";

export type LaneKey = "lane1" | "lane2" | "lane3";

export type TurnPhase =
  | "start"
  | "player"
  | "enemy"
  | "resolve"
  | "postResolve"
  | "end";

export type CardTrigger = "onPlay" | "onReveal" | "ongoing" | null;

export type CardAbility =
  | "draw_card"
  | "gain_energy"
  | "solo_buff"
  | "buff_allies"
  | "buff_next_card"
  | "debuff_enemy"
  | "debuff_all_enemies"
  | "destroy_enemy"
  | "destroy_weakest_enemy"
  | "move_once";

export type LaneTrigger =
  | "onReveal"
  | "eachTurn"
  | "turn5"
  | "endGame"
  | "ongoing";

export type LaneEffect =
  | "buff_all_cards"
  | "debuff_all_cards"
  | "winner_bonus_power"
  | "first_to_fill_draw"
  | "move_into_lane"
  | "winner_destroy_random";

export interface Card {
  id: string;
  name: string;

  cost: number;

  basePower: number;
  power: number;
  modifier: number;

  revealed?: boolean;
  queued?: boolean;

  trigger?: CardTrigger;
  ability?: CardAbility;

  description?: string;

  buffed?: boolean;
  debuffed?: boolean;

  moved?: boolean;

  nextCardBuffUsed?: boolean;
}

export interface Player {
  id: PlayerId;

  deck: Card[];
  hand: Card[];

  board: Record<LaneKey, Card[]>;

  energy: number;
  bonusEnergy: number;
}

export type Lane = {
  id: LaneKey;

  name: string;

  image?: string;

  description?: string;

  revealed: boolean;

  effect?: LaneEffect;

  trigger?: LaneTrigger;
};

export interface GameState {
  turn: number;

  currentPhase: TurnPhase;

  revealPriority: PlayerId;

  players: Record<PlayerId, Player>;

  lanes: Lane[];

  maxTurns: number;
}
