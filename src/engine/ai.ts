import { GameState } from "./types";
import { playCard } from "./actions";

export function runAI(state: GameState) {
  const player = state.players.player2;

  const lanes = ["lane1", "lane2", "lane3"] as const;

  for (let i = 0; i < player.hand.length; i++) {
    const card = player.hand[i];

    if (!card) continue;

    if (card.cost > player.energy) continue;

    // try find lane
    for (const lane of lanes) {
      if (player.board[lane].length < 4) {
        playCard(state, "player2", i, lane);
        break;
      }
    }

    // IMPORTANT: re-check energy after every play
    if (player.energy <= 0) break;
  }
}
