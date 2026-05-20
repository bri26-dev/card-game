import type { Deck } from "@/engine/types/deck";

import { starterCards } from "./cards";

export const starterDecks: Deck[] = [
  {
    id: "starter_deck",

    name: "Starter Deck",

    cards: starterCards,
  },
];
