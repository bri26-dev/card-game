// engine/ai.ts

import { GameState } from "./types";
import { playCard, getLanePower } from "./actions";

export function runAI(state: GameState) {
  const ai = state.players.player2;
  const player = state.players.player1;

  const lanes = ["lane1", "lane2", "lane3"] as const;

  for (let i = 0; i < ai.hand.length; i++) {
    const card = ai.hand[i];
    if (!card) continue;

    if (card.cost > ai.energy) continue;

    // 🧠 Evaluate all lanes
    const laneScores = lanes.map((lane) => {
      const aiPower = getLanePower(ai.board[lane]);
      const playerPower = getLanePower(player.board[lane]);

      const space = ai.board[lane].length < 4 ? 1 : -999;

      const diff = aiPower - playerPower;

      return {
        lane,
        score:
          // prefer lanes we are losing slightly
          -Math.abs(diff) +
          // avoid full lanes
          space +
          // randomness
          Math.random() * 2,
      };
    });

    // 🎯 sort best lane
    laneScores.sort((a, b) => b.score - a.score);

    const best = laneScores[0];

    if (best.score < -100) continue; // skip full lanes

    // 🎲 slight randomness
    const chosen =
      Math.random() < 0.25 && laneScores[1] ? laneScores[1].lane : best.lane;

    playCard(state, "player2", i, chosen);

    // adjust loop after splice
    i--;

    if (ai.energy <= 0) break;
  }
}
