import { GameState } from "./types";

export function recalculatePower(state: GameState) {
  for (const player of Object.values(state.players)) {
    for (const lane of Object.values(player.board)) {
      lane.forEach((card) => {
        const modifier = card.modifier ?? 0;

        card.power = Math.max(0, card.basePower + modifier);

        card.buffed = modifier > 0;
        card.debuffed = modifier < 0;
      });
    }
  }
}
