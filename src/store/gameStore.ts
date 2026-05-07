// store/gameStore.ts

import { create } from "zustand";
import { GameState } from "@/engine/types";
import { createGameState } from "@/engine/gameState";
import {
  startTurn,
  playCard as playCardAction,
  drawCard,
} from "@/engine/actions";
import { starterCards } from "@/data/cards";
import { runAI } from "@/engine/ai";
import { shuffle } from "@/engine/shuffle";
import { applyLaneEffects, resetCardStates } from "@/engine/laneEffects";
import { revealCards } from "@/engine/reveal";
import { recalculatePower } from "@/engine/power";

interface GameStore {
  state: GameState | null;
  history: GameState[];

  initGame: () => void;
  playCard: (playerId: "player1" | "player2", index: number, lane: any) => void;
  endTurn: () => void;
  undo: () => void;
  restartGame: () => void;
}

export const useGameStore = create<GameStore>((set, get) => ({
  state: null,
  history: [],

  initGame: () => {
    const deck1 = shuffle(structuredClone(starterCards));

    const deck2 = shuffle(structuredClone(starterCards));

    const state = createGameState(deck1, deck2);

    for (let i = 0; i < 4; i++) {
      drawCard(state, "player1");
      drawCard(state, "player2");
    }

    startTurn(state);

    state.phase = "player"; // ✅ IMPORTANT

    set({ state, history: [] });
  },

  playCard: (playerId, index, lane) => {
    const state = get().state;
    const history = get().history;

    if (!state) return;

    // 🚫 block actions if game ended or not player phase
    if (state.phase === "end" || state.phase !== "player") return;

    // save snapshot
    const snapshot = JSON.parse(JSON.stringify(state));
    history.push(snapshot);

    playCardAction(state, playerId, index, lane);

    set({
      state: { ...state },
      history: [...history],
    });
  },

  undo: () => {
    const history = get().history;

    if (history.length === 0) return;

    const prev = history[history.length - 1];

    set({
      state: prev,
      history: history.slice(0, -1),
    });
  },

  restartGame: () => {
    get().initGame();
  },

  endTurn: () => {
    const state = get().state;
    if (!state) return;

    if (state.phase !== "player") return;

    // =========================
    // ENEMY TURN
    // =========================
    state.phase = "enemy";

    runAI(state);

    // =========================
    // RESOLVE
    // =========================
    state.phase = "resolve";

    resetCardStates(state);

    revealCards(state);

    applyLaneEffects(state, "ongoing");

    applyLaneEffects(state, "eachTurn");

    if (state.turn === 5) {
      applyLaneEffects(state, "turn5");
    }

    recalculatePower(state);
    // =========================
    // END GAME
    // =========================
    if (state.turn >= state.maxTurns) {
      applyLaneEffects(state, "endGame");

      recalculatePower(state);

      state.phase = "postResolve";

      set({
        state: { ...state },
        history: [],
      });

      return;
    }

    // =========================
    // NEXT TURN
    // =========================
    state.turn += 1;

    // reveal lane 2
    if (state.turn === 2) {
      state.lanes[1].revealed = true;

      applyLaneEffects(state, "onReveal");
    }

    // reveal lane 3
    if (state.turn === 3) {
      state.lanes[2].revealed = true;

      applyLaneEffects(state, "onReveal");
    }

    startTurn(state);

    state.phase = "player";

    set({
      state: { ...state },
      history: [],
    });
  },
}));
