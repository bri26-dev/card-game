import { GameState } from "../types";

import { runAI } from "../ai/runAi";

import { revealCards } from "./revealSystem";

import { resetCardModifiers, applyLaneEffects } from "../effects/laneEffects";

import { recalculatePower } from "./powerSystem";

import { startTurn } from "./cardActions";

export function resolveTurn(state: GameState) {
  state.currentPhase = "enemy";

  runAI(state);

  state.currentPhase = "resolve";

  /**
   * RESET MODIFIERS
   */
  resetCardModifiers(state);

  /**
   * REVEAL CARDS
   */
  revealCards(state);

  /**
   * LANE EFFECTS
   */
  applyLaneEffects(state, "ongoing");

  applyLaneEffects(state, "eachTurn");

  if (state.turn === 5) {
    applyLaneEffects(state, "turn5");
  }

  /**
   * RECALCULATE FINAL POWER
   */
  recalculatePower(state);
}

export function prepareNextTurn(state: GameState) {
  state.turn += 1;

  if (state.turn === 2) {
    state.lanes[1].revealed = true;

    applyLaneEffects(state, "onReveal");
  }

  if (state.turn === 3) {
    state.lanes[2].revealed = true;

    applyLaneEffects(state, "onReveal");
  }

  startTurn(state);

  state.currentPhase = "player";
}
