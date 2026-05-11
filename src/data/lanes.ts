import { LaneEffect, LaneTrigger } from "@/engine/types";

type LaneTemplate = {
  name: string;

  effect?: LaneEffect;

  trigger?: LaneTrigger;
};

export const lanePool: LaneTemplate[] = [
  {
    name: "Plains",
  },

  {
    name: "Village",
  },

  {
    name: "Training Grounds",

    effect: "buff_all_cards",

    trigger: "ongoing",
  },

  {
    name: "Swamp",

    effect: "debuff_all_cards",

    trigger: "ongoing",
  },

  {
    name: "Arena",

    effect: "winner_bonus_power",

    trigger: "eachTurn",
  },

  {
    name: "Library",

    effect: "first_to_fill_draw",

    trigger: "eachTurn",
  },
  {
    name: "Execution Grounds",

    effect: "winner_destroy_random",

    trigger: "turn5",
  },
];
