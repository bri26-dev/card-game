// data/assets/lanes.ts

import { LaneEffect, LaneTrigger } from "@/engine/types/types";

export type LaneTemplate = {
  name: string;

  image: string;

  description: string;

  effect?: LaneEffect;

  trigger?: LaneTrigger;
};

export const lanePool: LaneTemplate[] = [
  {
    name: "Plains",

    image: "/assets/lanes/plains.png",

    description: "No special effects.",
  },

  {
    name: "Village",

    image: "/assets/lanes/village.png",

    description: "No special effects.",
  },

  {
    name: "Training Grounds",

    image: "/assets/lanes/training_grounds.png",

    description: "Cards here have +1 Power.",

    effect: "buff_all_cards",

    trigger: "ongoing",
  },

  {
    name: "Swamp",

    image: "/assets/lanes/swamp.png",

    description: "Cards here have -1 Power.",

    effect: "debuff_all_cards",

    trigger: "ongoing",
  },

  {
    name: "Arena",

    image: "/assets/lanes/arena.png",

    description: "The winning side here gains +1 Power.",

    effect: "winner_bonus_power",

    trigger: "eachTurn",
  },

  {
    name: "Library",

    image: "/assets/lanes/library.png",

    description: "First player to fill this location draws a card.",

    effect: "first_to_fill_draw",

    trigger: "eachTurn",
  },

  {
    name: "Execution Grounds",

    image: "/assets/lanes/execution_grounds.png",

    description: "Turn 5: The winning side destroys a random enemy card here.",

    effect: "winner_destroy_random",

    trigger: "turn5",
  },
];
