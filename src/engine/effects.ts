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

  if (!card.ability) return;

  switch (card.ability) {
    case "draw":
      drawCard(state, playerId);
      break;

    case "self_buff":
      card.modifier += 2;
      break;

    case "boost_lane":
      player.board[lane].forEach((c) => {
        if (c.id !== card.id) c.modifier += 1;
      });
      break;

    case "weaken_enemy":
      enemy.board[lane].forEach((c) => {
        c.modifier -= 1;
      });
      break;

    case "global_weaken":
      Object.values(enemy.board).forEach((laneCards) => {
        laneCards.forEach((c) => (c.modifier -= 1));
      });
      break;

    case "gain_energy":
      player.bonusEnergy += 1;
      break;
  }
}
