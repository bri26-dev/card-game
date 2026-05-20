import { create } from "zustand";

import { GameState, LaneKey, PlayerId } from "@/engine/types/types";

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

import { useDeckStore } from "./deckStore";

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

  surrenderGame: () => void; // ADDED

  canUndo: () => boolean;
}

export const useGameStore = create<GameStore>((set, get) => ({
  gameState: null,

  history: [],

  initializeGame: () => {
    const selectedDeck = useDeckStore.getState().getSelectedDeck();

    const cards = selectedDeck?.cards?.length
      ? selectedDeck.cards
      : starterCards;

    const playerOneDeck = shuffle(structuredClone(cards));

    const playerTwoDeck = shuffle(structuredClone(cards));

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

  canUndo: () => {
    return get().history.length > 0;
  },

  // ONLY ADDED THIS
  surrenderGame: () => {
    const { gameState } = get();

    if (!gameState) return;

    const nextState = structuredClone(gameState);

    // clear player's cards so enemy always wins
    nextState.players.player1.board = {
      lane1: [],
      lane2: [],
      lane3: [],
    };

    nextState.currentPhase = "end";

    set({
      gameState: nextState,
      history: [],
    });
  },

  restartGame: () => {
    get().initializeGame();
  },

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
