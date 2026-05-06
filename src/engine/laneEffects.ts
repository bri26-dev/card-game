import { GameState } from "./types";

export function applyLaneEffects(state: GameState) {
  for (const lane of state.lanes) {
    const p1 = state.players.player1.board[lane.id];
    const p2 = state.players.player2.board[lane.id];

    const allCards = [...p1, ...p2];

    switch (lane.effect) {
      case "boost_all":
        allCards.forEach((c) => {
          if (!c.laneBuffApplied) {
            c.power += 1;
            c.laneBuffApplied = true; // ✅ prevent stacking
          }
        });
        break;

      case "weaken_all":
        allCards.forEach((c) => {
          if (!c.laneBuffApplied) {
            c.power -= 1;
            c.laneBuffApplied = true;
          }
        });
        break;

      case "draw_bonus":
        // this one can stay dynamic (no marking needed)
        if (p1.length > p2.length) {
          state.players.player1.energy += 1;
        } else if (p2.length > p1.length) {
          state.players.player2.energy += 1;
        }
        break;
    }
  }
}
