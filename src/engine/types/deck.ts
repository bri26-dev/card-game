import type { Card } from "./types";

export type Deck = {
  id: string;

  name: string;

  cards: Card[];
};
