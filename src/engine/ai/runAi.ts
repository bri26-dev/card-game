import { GameState, LaneKey } from "../types/types";

import { getLanePower, playCard } from "../core/cardActions";

export function runAI(state: GameState) {
  const aiPlayer = state.players.player2;

  const humanPlayer = state.players.player1;

  const lanes: LaneKey[] = ["lane1", "lane2", "lane3"];

  for (let handIndex = 0; handIndex < aiPlayer.hand.length; handIndex++) {
    const card = aiPlayer.hand[handIndex];

    if (!card) continue;

    if (card.cost > aiPlayer.energy) continue;

    const laneEvaluations = lanes.map((laneKey) => {
      const aiLanePower = getLanePower(aiPlayer.board[laneKey]);

      const playerLanePower = getLanePower(humanPlayer.board[laneKey]);

      const laneHasSpace = aiPlayer.board[laneKey].length < 4;

      const powerDifference = aiLanePower - playerLanePower;

      return {
        lane: laneKey,

        score:
          -Math.abs(powerDifference) +
          (laneHasSpace ? 1 : -999) +
          Math.random() * 2,
      };
    });

    laneEvaluations.sort((a, b) => b.score - a.score);

    const bestLane = laneEvaluations[0];

    if (bestLane.score < -100) continue;

    const chosenLane =
      Math.random() < 0.25 && laneEvaluations[1]
        ? laneEvaluations[1].lane
        : bestLane.lane;

    playCard(state, "player2", handIndex, chosenLane);

    handIndex--;

    if (aiPlayer.energy <= 0) break;
  }
}
