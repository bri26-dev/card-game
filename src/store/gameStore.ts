import { create } from "zustand";

import { GameState, LaneKey, PlayerId } from "@/engine/types";

import { starterCards } from "@/data/cards";

import { shuffle } from "@/engine/utils/shuffle";

import { createGameState } from "@/engine/core/gameState";

import {
  drawCard,
  moveCard as moveCardAction,
  playCard as playCardAction,
  startTurn,
} from "@/engine/core/cardActions";

import { applyLaneEffects } from "@/engine/effects/laneEffects";

import { recalculatePower } from "@/engine/core/powerSystem";

import { prepareNextTurn, resolveTurn } from "@/engine/core/gameFlow";

interface GameStore {
  gameState: GameState | null;

  history: GameState[];

  initializeGame: () => void;

  playCard: (
    playerId: PlayerId,
    handIndex: number,
    targetLane: LaneKey,
  ) => void;

  moveCard: (
    playerId: PlayerId,
    fromLane: LaneKey,
    toLane: LaneKey,
    cardId: string,
  ) => void;

  endTurn: () => void;

  undoLastAction: () => void;

  restartGame: () => void;
}

export const useGameStore = create<GameStore>((set, get) => ({
  gameState: null,

  history: [],

  initializeGame: () => {
    const playerOneDeck = shuffle(structuredClone(starterCards));

    const playerTwoDeck = shuffle(structuredClone(starterCards));

    const gameState = createGameState(playerOneDeck, playerTwoDeck);

    /**
     * STARTING HAND
     */
    for (let i = 0; i < 3; i++) {
      drawCard(gameState, "player1");
      drawCard(gameState, "player2");
    }

    /**
     * START TURN 1
     */
    startTurn(gameState);

    gameState.currentPhase = "player";

    set({
      gameState,
      history: [],
    });
  },
  playCard: (playerId, handIndex, targetLane) => {
    const { gameState, history } = get();

    if (!gameState) return;

    if (gameState.currentPhase !== "player") {
      return;
    }

    const snapshot = structuredClone(gameState);

    const nextState = structuredClone(gameState);

    playCardAction(nextState, playerId, handIndex, targetLane);

    set({
      gameState: nextState,
      history: [...history, snapshot],
    });
  },

  moveCard: (playerId, fromLane, toLane, cardId) => {
    const { gameState, history } = get();

    if (!gameState) return;

    /**
     * ONLY PLAYER PHASE
     */
    if (gameState.currentPhase !== "player") {
      return;
    }

    const snapshot = structuredClone(gameState);

    const nextState = structuredClone(gameState);

    moveCardAction(nextState, playerId, fromLane, toLane, cardId);

    set({
      gameState: nextState,
      history: [...history, snapshot],
    });
  },

  undoLastAction: () => {
    const { history } = get();

    if (history.length === 0) return;

    const previousState = history[history.length - 1];

    set({
      gameState: previousState,

      history: history.slice(0, -1),
    });
  },

  restartGame: () => {
    get().initializeGame();
  },

  // store/gameStore.ts
  // ONLY REPLACE THE endTurn FUNCTION

  endTurn: () => {
    const { gameState } = get();

    if (!gameState) return;

    if (gameState.currentPhase !== "player") {
      return;
    }

    const nextState = structuredClone(gameState);

    /**
     * RESOLVE CURRENT TURN
     */
    resolveTurn(nextState);

    /**
     * IMPORTANT:
     * KEEP BOARD VISIBLE
     * AFTER TURN 6 RESOLUTION
     */
    const isFinalTurn = nextState.turn >= nextState.maxTurns;

    if (isFinalTurn) {
      /**
       * ENDGAME LANE EFFECTS
       */
      applyLaneEffects(nextState, "endGame");

      /**
       * FINAL POWER RECALC
       */
      recalculatePower(nextState);

      /**
       * DO NOT INSTANTLY RESET
       * JUST ENTER END STATE
       */
      nextState.currentPhase = "end";

      set({
        gameState: nextState,
        history: [],
      });

      return;
    }

    /**
     * NEXT TURN
     */
    prepareNextTurn(nextState);

    set({
      gameState: nextState,
      history: [],
    });
  },
}));
