import { Card } from "../engine/types";

const makeCard = (card: Omit<Card, "basePower" | "modifier">): Card => ({
  ...card,

  basePower: card.power,

  modifier: 0,
});

export const starterCards: Card[] = [
  makeCard({
    id: "warrior_1",
    name: "Warrior",
    cost: 1,
    power: 2,
    effect: null,
    description: "No Ability.",
  }),

  makeCard({
    id: "rogue_1",
    name: "Rogue",
    cost: 1,
    power: 1,
    effect: "onPlay",
    ability: "gain_energy",
    description: "On Reveal: Gain +1 Energy next turn.",
  }),

  makeCard({
    id: "scout_1",
    name: "Scout",
    cost: 2,
    power: 2,
    effect: "onPlay",
    ability: "draw",
    description: "On Reveal: Draw a card.",
  }),

  makeCard({
    id: "hunter_1",
    name: "Hunter",
    cost: 2,
    power: 3,
    effect: null,
    description: "No Ability.",
  }),

  makeCard({
    id: "saboteur_1",
    name: "Saboteur",
    cost: 2,
    power: 2,
    effect: "onPlay",
    ability: "weaken_enemy",
    description: "On Reveal: Enemy cards here lose -1 Power.",
  }),

  makeCard({
    id: "captain_1",
    name: "Captain",
    cost: 3,
    power: 3,
    effect: "onPlay",
    ability: "boost_lane",
    description: "On Reveal: Other friendly cards here gain +1 Power.",
  }),

  makeCard({
    id: "mage_1",
    name: "Mage",
    cost: 3,
    power: 4,
    effect: null,
    description: "No Ability.",
  }),

  makeCard({
    id: "guardian_1",
    name: "Guardian",
    cost: 3,
    power: 5,
    effect: null,
    description: "No Ability.",
  }),

  makeCard({
    id: "berserker_1",
    name: "Berserker",
    cost: 4,
    power: 6,
    effect: null,
    description: "No Ability.",
  }),

  makeCard({
    id: "witch_1",
    name: "Witch",
    cost: 4,
    power: 3,
    effect: "onPlay",
    ability: "global_weaken",
    description: "On Reveal: All enemy cards lose 1 Power.",
  }),

  makeCard({
    id: "sniper_1",
    name: "Sniper",
    cost: 4,
    power: 5,
    effect: null,
    description: "No Ability.",
  }),

  makeCard({
    id: "paladin_1",
    name: "Paladin",
    cost: 5,
    power: 8,
    effect: null,
    description: "No Ability.",
  }),

  makeCard({
    id: "knight_1",
    name: "Knight",
    cost: 5,
    power: 7,
    effect: null,
    description: "No Ability.",
  }),

  makeCard({
    id: "tank_1",
    name: "Tank",
    cost: 6,
    power: 10,
    effect: null,
    description: "No Ability.",
  }),
];
