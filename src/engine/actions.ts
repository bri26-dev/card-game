// engine/actions.ts

import { GameState, LaneKey } from "./types";
import { applyCardEffect } from "./effects";

export function drawCard(state: GameState, playerId: "player1" | "player2") {
  const player = state.players[playerId];

  if (player.deck.length === 0) return;
  if (player.hand.length >= 10) return;

  const card = player.deck.shift()!;
  player.hand.push(card);
}

export function startTurn(state: GameState) {
  state.players.player1.energy = state.turn + state.players.player1.bonusEnergy;

  state.players.player2.energy = state.turn + state.players.player2.bonusEnergy;

  // consume bonus
  state.players.player1.bonusEnergy = 0;
  state.players.player2.bonusEnergy = 0;

  drawCard(state, "player1");
  drawCard(state, "player2");
}

export function playCard(
  state: GameState,
  playerId: "player1" | "player2",
  cardIndex: number,
  lane: LaneKey,
) {
  const player = state.players[playerId];

  const card = player.hand[cardIndex];

  if (!card) return;

  if (card.cost > player.energy) return;

  if (player.board[lane].length >= 4) return;

  // spend energy
  player.energy -= card.cost;

  // remove from hand
  player.hand.splice(cardIndex, 1);

  // ADD FACE DOWN
  player.board[lane].push({
    ...card,

    queued: true,
    revealed: false,
  });
}

// 🔢 lane power
export function getLanePower(cards: any[]) {
  return cards.reduce((sum, c) => {
    return sum + (c.basePower + (c.modifier ?? 0));
  }, 0);
}

// 🏆 total
export function getTotalPower(player: any) {
  return Object.values(player.board).reduce((total: number, lane: any) => {
    return total + lane.reduce((sum: number, c: any) => sum + c.power, 0);
  }, 0);
}

export function getLaneWinner(p1: any[], p2: any[]) {
  const p1Power = p1.reduce((s, c) => s + c.power, 0);
  const p2Power = p2.reduce((s, c) => s + c.power, 0);

  if (p1Power > p2Power) return "player1";
  if (p2Power > p1Power) return "player2";
  return "draw";
}

// 🏁 winner
export function getWinner(state: GameState) {
  let p1Wins = 0;
  let p2Wins = 0;

  for (const lane of state.lanes) {
    const laneId = lane.id;

    const result = getLaneWinner(
      state.players.player1.board[laneId],
      state.players.player2.board[laneId],
    );

    if (result === "player1") p1Wins++;
    if (result === "player2") p2Wins++;
  }

  // 🏆 lane victory
  if (p1Wins >= 2) return "player1";
  if (p2Wins >= 2) return "player2";

  // ⚖ fallback → total power
  const p1Total = getTotalPower(state.players.player1);
  const p2Total = getTotalPower(state.players.player2);

  if (p1Total > p2Total) return "player1";
  if (p2Total > p1Total) return "player2";

  return "draw";
}
