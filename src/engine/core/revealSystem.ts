import { GameState, LaneKey, PlayerId } from "../types";

import { applyCardEffect } from "../effects/cardEffects";

function revealPlayerCards(state: GameState, playerId: PlayerId) {
  const board = state.players[playerId].board;

  for (const laneKey of Object.keys(board) as LaneKey[]) {
    const laneCards = board[laneKey];

    for (const card of laneCards) {
      /**
       * ONLY reveal queued cards
       */
      if (!card.queued) continue;

      card.queued = false;
      card.revealed = true;

      /**
       * TRIGGER EFFECT
       */
      if (card.trigger === "onReveal") {
        applyCardEffect(state, playerId, card, laneKey);
      }
    }
  }
}

export function revealCards(state: GameState) {
  /**
   * Reveal priority matters
   */
  if (state.revealPriority === "player1") {
    revealPlayerCards(state, "player1");
    revealPlayerCards(state, "player2");
  } else {
    revealPlayerCards(state, "player2");
    revealPlayerCards(state, "player1");
  }

  /**
   * Swap next turn priority
   */
  state.revealPriority =
    state.revealPriority === "player1" ? "player2" : "player1";
}
