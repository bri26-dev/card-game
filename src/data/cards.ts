import { Card } from "../engine/types";

export const starterCards: Card[] = [
  { id: "warrior_1", name: "Warrior", cost: 1, power: 3, effect: null },
  {
    id: "scout_1",
    name: "Scout",
    cost: 2,
    power: 1,
    effect: "onPlay",
    ability: "draw",
  },
  { id: "archer_1", name: "Archer", cost: 3, power: 4, effect: null },
  { id: "sniper_1", name: "Sniper", cost: 4, power: 5, effect: null },
  {
    id: "captain_1",
    name: "Captain",
    cost: 3,
    power: 2,
    effect: "onPlay",
    ability: "boost_lane",
  },
  { id: "guardian_1", name: "Guardian", cost: 3, power: 6, effect: null },
  { id: "rogue_1", name: "Rogue", cost: 1, power: 2, effect: null },
  {
    id: "saboteur_1",
    name: "Saboteur",
    cost: 2,
    power: 2,
    effect: "onPlay",
    ability: "weaken_enemy",
  },
  { id: "knight_1", name: "Knight", cost: 5, power: 7, effect: null },

  { id: "berserker_1", name: "Berserker", cost: 4, power: 6, effect: null },
  { id: "mage_1", name: "Mage", cost: 3, power: 5, effect: null },
  { id: "paladin_1", name: "Paladin", cost: 5, power: 8, effect: null },
  { id: "assassin_1", name: "Assassin", cost: 2, power: 4, effect: null },
  { id: "hunter_1", name: "Hunter", cost: 2, power: 3, effect: null },
  { id: "tank_1", name: "Tank", cost: 6, power: 9, effect: null },
  {
    id: "priest_1",
    name: "Priest",
    cost: 2,
    power: 2,
    effect: "onPlay",
    ability: "boost_lane",
  },
  {
    id: "witch_1",
    name: "Witch",
    cost: 4,
    power: 4,
    effect: "onPlay",
    ability: "global_weaken", // 🔥 affects ALL cards
  },
];
