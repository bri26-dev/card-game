import { GameState } from "./types";
import { applyCardEffect } from "./effects";

export function revealCards(state: GameState) {
  const order =
    state.priorityPlayer === "player1"
      ? ["player1", "player2"]
      : ["player2", "player1"];

  for (const playerId of order) {
    const player = state.players[playerId];

    for (const laneKey of ["lane1", "lane2", "lane3"] as const) {
      const lane = player.board[laneKey];

      for (const card of lane) {
        if (!card.queued) continue;

        card.queued = false;
        card.revealed = true;

        if (card.effect === "onPlay") {
          applyCardEffect(state, playerId, card, laneKey);
        }
      }
    }
  }
}
