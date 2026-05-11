import { Card, GameState, LaneKey, PlayerId } from "../types";

import { drawCard } from "../core/cardActions";

type CardEffectHandler = (
  state: GameState,
  playerId: PlayerId,
  card: Card,
  lane: LaneKey,
) => void;

function getEnemy(playerId: PlayerId): PlayerId {
  return playerId === "player1" ? "player2" : "player1";
}

function getRandomCard(cards: Card[]) {
  if (cards.length === 0) {
    return null;
  }

  return cards[Math.floor(Math.random() * cards.length)];
}

const cardEffects: Record<string, CardEffectHandler> = {
  /**
   * DRAW
   */
  draw_card: (state, playerId) => {
    drawCard(state, playerId);
  },

  /**
   * ENERGY
   */
  gain_energy: (state, playerId) => {
    state.players[playerId].bonusEnergy += 1;
  },

  /**
   * SOLO BUFF
   */
  solo_buff: (state, playerId, card, lane) => {
    const allies = state.players[playerId].board[lane];

    if (allies.length === 1) {
      card.modifier += 2;
    }
  },

  /**
   * BUFF ALLIES
   */
  buff_allies: (state, playerId, card, lane) => {
    const allies = state.players[playerId].board[lane];

    allies.forEach((ally) => {
      if (ally.id !== card.id) {
        ally.modifier += 1;
      }
    });
  },

  /**
   * RANDOM DEBUFF
   */
  debuff_enemy: (state, playerId, _, lane) => {
    const enemy = getEnemy(playerId);

    const enemyCards = state.players[enemy].board[lane];

    const target = getRandomCard(enemyCards);

    if (!target) return;

    target.modifier -= 2;
  },

  /**
   * GLOBAL DEBUFF
   */
  debuff_all_enemies: (state, playerId) => {
    const enemy = getEnemy(playerId);

    Object.values(state.players[enemy].board).forEach((laneCards) => {
      laneCards.forEach((card) => {
        card.modifier -= 1;
      });
    });
  },

  /**
   * DESTROY RANDOM
   */
  destroy_enemy: (state, playerId, _, lane) => {
    const enemy = getEnemy(playerId);

    const enemyLane = state.players[enemy].board[lane];

    if (enemyLane.length === 0) {
      return;
    }

    const randomIndex = Math.floor(Math.random() * enemyLane.length);

    enemyLane.splice(randomIndex, 1);
  },

  /**
   * DESTROY WEAKEST
   */
  destroy_weakest_enemy: (state, playerId, _, lane) => {
    const enemy = getEnemy(playerId);

    const enemyLane = state.players[enemy].board[lane];

    if (enemyLane.length === 0) {
      return;
    }

    let weakestIndex = 0;

    for (let i = 1; i < enemyLane.length; i++) {
      const current = enemyLane[i].basePower + enemyLane[i].modifier;

      const weakest =
        enemyLane[weakestIndex].basePower + enemyLane[weakestIndex].modifier;

      if (current < weakest) {
        weakestIndex = i;
      }
    }

    enemyLane.splice(weakestIndex, 1);
  },
};

export function applyCardEffect(
  state: GameState,
  playerId: PlayerId,
  card: Card,
  lane: LaneKey,
) {
  if (!card.ability) {
    return;
  }

  const effectHandler = cardEffects[card.ability];

  if (!effectHandler) {
    return;
  }

  effectHandler(state, playerId, card, lane);
}
