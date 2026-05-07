import { GameState } from "./types";
import { getLaneWinner } from "./actions";

export function resetCardStates(state: GameState) {
  for (const player of Object.values(state.players)) {
    for (const lane of Object.values(player.board)) {
      lane.forEach((card) => {
        card.modifier = 0;
        card.buffed = false;
        card.debuffed = false;
      });
    }
  }
}

export function applyLaneEffects(
  state: GameState,
  trigger: "ongoing" | "eachTurn" | "turn5" | "onReveal" | "endGame",
) {
  for (const lane of state.lanes) {
    if (!lane.revealed) continue;
    if (lane.trigger !== trigger) continue;

    const p1 = state.players.player1.board[lane.id];
    const p2 = state.players.player2.board[lane.id];

    const all = [...p1, ...p2];

    switch (lane.effect) {
      case "boost_all":
        all.forEach((c) => (c.modifier += 1));
        break;

      case "weaken_all":
        all.forEach((c) => (c.modifier -= 1));
        break;

      case "draw_bonus": {
        const winner = getLaneWinner(p1, p2);

        if (winner === "player1") state.players.player1.bonusEnergy += 1;
        if (winner === "player2") state.players.player2.bonusEnergy += 1;
        break;
      }

      case "power_if_winning": {
        const winner = getLaneWinner(p1, p2);

        if (winner === "player1") p1.forEach((c) => (c.modifier += 1));
        if (winner === "player2") p2.forEach((c) => (c.modifier += 1));
        break;
      }

      case "reveal_buff":
        all.forEach((c) => {
          c.modifier += 1;
        });
        break;

      case "final_power":
        all.forEach((c) => (c.modifier += 2));
        break;
    }
  }
}
