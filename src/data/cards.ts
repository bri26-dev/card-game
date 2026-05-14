// data/assets/cards.ts

import { Card } from "@/engine/types";

type CardTemplate = Omit<Card, "basePower" | "modifier"> & {
  image: string;
};

function createCard(cardData: CardTemplate): CardTemplate & {
  basePower: number;
  modifier: number;
} {
  return {
    ...cardData,
    basePower: cardData.power,
    modifier: 0,
  };
}

export const starterCards = [
  /**
   * VANILLA
   */
  createCard({
    id: "warrior_1",
    name: "Warrior",

    image: "/assets/cards/warrior.png",

    cost: 1,
    power: 2,

    trigger: null,

    description: "No Ability.",
  }),

  /**
   * ENERGY
   */
  createCard({
    id: "rogue_1",
    name: "Rogue",

    image: "/assets/cards/rogue.png",

    cost: 1,
    power: 1,

    trigger: "onReveal",
    ability: "gain_energy",

    description: "On Reveal: Gain +1 Energy next turn.",
  }),

  /**
   * DRAW
   */
  createCard({
    id: "scout_1",
    name: "Scout",

    image: "/assets/cards/scout.png",

    cost: 2,
    power: 2,

    trigger: "onReveal",
    ability: "draw_card",

    description: "On Reveal: Draw a card.",
  }),

  /**
   * SOLO BUFF
   */
  createCard({
    id: "berserker_1",
    name: "Berserker",

    image: "/assets/cards/berserker.png",

    cost: 2,
    power: 3,

    trigger: "onReveal",
    ability: "solo_buff",

    description: "On Reveal: If this is your only card here, gain +2 Power.",
  }),

  /**
   * LANE BUFF
   */
  createCard({
    id: "captain_1",
    name: "Captain",

    image: "/assets/cards/captain.png",

    cost: 3,
    power: 3,

    trigger: "onReveal",
    ability: "buff_allies",

    description: "On Reveal: Other allies here gain +1 Power.",
  }),

  /**
   * NEXT CARD BUFF
   */
  createCard({
    id: "bard_1",
    name: "Bard",

    image: "/assets/cards/bard.png",

    cost: 2,
    power: 2,

    trigger: "ongoing",
    ability: "buff_next_card",

    description: "Your next card played here gains +2 Power.",
  }),

  /**
   * RANDOM DEBUFF
   */
  createCard({
    id: "assassin_1",
    name: "Assassin",

    image: "/assets/cards/assassin.png",

    cost: 3,
    power: 2,

    trigger: "onReveal",
    ability: "debuff_enemy",

    description: "On Reveal: Random enemy here gets -2 Power.",
  }),

  /**
   * GLOBAL DEBUFF
   */
  createCard({
    id: "warlock_1",
    name: "Warlock",

    image: "/assets/cards/warlock.png",

    cost: 5,
    power: 4,

    trigger: "onReveal",
    ability: "debuff_all_enemies",

    description: "On Reveal: All enemy cards get -1 Power.",
  }),

  /**
   * DESTROY RANDOM
   */
  createCard({
    id: "hunter_1",
    name: "Hunter",

    image: "/assets/cards/hunter.png",

    cost: 4,
    power: 3,

    trigger: "onReveal",
    ability: "destroy_enemy",

    description: "On Reveal: Destroy a random enemy here.",
  }),

  /**
   * DESTROY WEAKEST
   */
  createCard({
    id: "executioner_1",
    name: "Executioner",

    image: "/assets/cards/executioner.png",

    cost: 5,
    power: 4,

    trigger: "onReveal",
    ability: "destroy_weakest_enemy",

    description: "On Reveal: Destroy the weakest enemy here.",
  }),

  /**
   * MOVE
   */
  createCard({
    id: "wanderer_1",
    name: "Wanderer",

    image: "/assets/cards/wanderer.png",

    cost: 2,
    power: 4,

    trigger: null,
    ability: "move_once",

    description: "Can move once to another location.",
  }),

  /**
   * BIG BODY
   */
  createCard({
    id: "giant_1",
    name: "Giant",

    image: "/assets/cards/giant.png",

    cost: 6,
    power: 8,

    trigger: null,

    description: "No Ability.",
  }),
];
