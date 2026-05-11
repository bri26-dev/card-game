import { Card } from "../types";

export function getCardPower(card: Card): number {
  return Math.max(0, card.basePower + (card.modifier ?? 0));
}
