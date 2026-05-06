import { GameState, Card, LaneKey } from "./types";
import { drawCard } from "./actions";

export function applyCardEffect(
  state: GameState,
  playerId: "player1" | "player2",
  card: Card,
  lane: LaneKey,
) {
  const player = state.players[playerId];
  const enemy = state.players[playerId === "player1" ? "player2" : "player1"];

  // ❗ ignore cards with no ability
  if (!card.ability) return;

  switch (card.ability) {
    case "draw":
      drawCard(state, playerId);
      break;

    case "boost_lane":
      // ✅ only THIS lane, only your cards
      player.board[lane].forEach((c) => {
        if (c.id !== card.id) c.power += 1;
      });
      break;

    case "weaken_enemy":
      enemy.board[lane].forEach((c) => {
        c.power = Math.max(0, c.power - 1);
      });
      break;

    case "global_weaken":
      // 🔥 future card (witch)
      Object.values(enemy.board).forEach((laneCards) => {
        laneCards.forEach((c) => (c.power -= 1));
      });

      Object.values(player.board).forEach((laneCards) => {
        laneCards.forEach((c) => (c.power -= 1));
      });
      break;

    case "gain_energy":
      player.energy += 1;
      break;
  }
}
