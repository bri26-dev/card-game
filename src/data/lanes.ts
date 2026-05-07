// data/lanes.ts

type LaneTemplate = {
  name: string;

  effect?: string;

  trigger?: "onReveal" | "eachTurn" | "turn5" | "endGame" | "ongoing";
};

export const lanePool: LaneTemplate[] = [
  // ===== NO EFFECT =====
  { name: "Plains" },
  { name: "Village" },
  { name: "Desert" },

  // ===== ONGOING =====
  {
    name: "Forest",
    effect: "boost_all",
    trigger: "ongoing",
  },

  {
    name: "Ruins",
    effect: "weaken_all",
    trigger: "ongoing",
  },

  // ===== EACH TURN =====
  {
    name: "Sanctuary",
    effect: "draw_bonus",
    trigger: "eachTurn",
  },

  // ===== TURN 5 =====
  {
    name: "Arena",
    effect: "power_if_winning",
    trigger: "turn5",
  },

  // ===== ON REVEAL =====
  {
    name: "Forge",
    effect: "reveal_buff",
    trigger: "onReveal",
  },

  // ===== END GAME =====
  {
    name: "Temple",
    effect: "final_power",
    trigger: "endGame",
  },
];
