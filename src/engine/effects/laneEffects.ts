import { Card, GameState, LaneEffect, LaneTrigger } from "../types";

import { getLaneWinner } from "../core/cardActions";

import { drawCard } from "../core/cardActions";

function getRandomCard(cards: Card[]) {
  if (cards.length === 0) {
    return null;
  }

  return cards[Math.floor(Math.random() * cards.length)];
}

export function resetCardModifiers(state: GameState) {
  for (const player of Object.values(state.players)) {
    for (const laneCards of Object.values(player.board)) {
      laneCards.forEach((card) => {
        card.modifier = 0;
      });
    }
  }
}

export function applyLaneEffects(state: GameState, trigger: LaneTrigger) {
  for (const lane of state.lanes) {
    if (!lane.revealed) continue;

    if (lane.trigger !== trigger) continue;

    const playerOneCards = state.players.player1.board[lane.id];

    const playerTwoCards = state.players.player2.board[lane.id];

    const allCards = [...playerOneCards, ...playerTwoCards];

    switch (lane.effect) {
      case "buff_all_cards":
        allCards.forEach((card) => {
          card.modifier += 1;
        });

        break;

      case "debuff_all_cards":
        allCards.forEach((card) => {
          card.modifier -= 1;
        });

        break;

      case "winner_bonus_power": {
        const winner = getLaneWinner(playerOneCards, playerTwoCards);

        if (winner === "player1") {
          playerOneCards.forEach((card) => {
            card.modifier += 1;
          });
        }

        if (winner === "player2") {
          playerTwoCards.forEach((card) => {
            card.modifier += 1;
          });
        }

        break;
      }

      case "first_to_fill_draw":
        if (playerOneCards.length === 4) {
          drawCard(state, "player1");
        }

        if (playerTwoCards.length === 4) {
          drawCard(state, "player2");
        }

        break;

      case "move_into_lane":
        break;

      case "winner_destroy_random": {
        const winner = getLaneWinner(playerOneCards, playerTwoCards);

        if (winner === "draw") {
          break;
        }

        const losingCards =
          winner === "player1" ? playerTwoCards : playerOneCards;

        const target = getRandomCard(losingCards);

        if (!target) {
          break;
        }

        if (winner === "player1") {
          state.players.player2.board[lane.id] = playerTwoCards.filter(
            (card) => card.id !== target.id,
          );
        } else {
          state.players.player1.board[lane.id] = playerOneCards.filter(
            (card) => card.id !== target.id,
          );
        }

        break;
      }
    }
  }
}

export function getLaneEffectText(effect?: LaneEffect) {
  switch (effect) {
    case "buff_all_cards":
      return "Cards here have +1 Power.";

    case "debuff_all_cards":
      return "Cards here have -1 Power.";

    case "winner_bonus_power":
      return "The winning side here gains +1 Power.";

    case "first_to_fill_draw":
      return "First player to fill this location draws a card.";

    case "winner_destroy_random":
      return "Turn 5: The winning side destroys a random enemy card here.";

    default:
      return "No special effect.";
  }
}
