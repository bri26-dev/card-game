import { GameState } from "../types";

export function recalculatePower(state: GameState) {
  for (const player of Object.values(state.players)) {
    for (const laneCards of Object.values(player.board)) {
      for (const card of laneCards) {
        card.power = card.basePower + card.modifier;
      }
    }
  }
}
