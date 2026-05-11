import { GameState, LaneKey, Player, PlayerId } from "../types";
import { getCardPower } from "../utils/card.utils";

export function drawCard(state: GameState, playerId: PlayerId) {
  const player = state.players[playerId];

  const isDeckEmpty = player.deck.length === 0;
  const isHandFull = player.hand.length >= 10;

  if (isDeckEmpty || isHandFull) return;

  const drawnCard = player.deck.shift();

  if (!drawnCard) return;

  player.hand.push(drawnCard);
}

export function startTurn(state: GameState) {
  for (const player of Object.values(state.players)) {
    player.energy = state.turn + player.bonusEnergy;

    player.bonusEnergy = 0;
  }

  drawCard(state, "player1");
  drawCard(state, "player2");
}

export function playCard(
  state: GameState,
  playerId: PlayerId,
  handIndex: number,
  targetLane: LaneKey,
) {
  const player = state.players[playerId];

  const selectedCard = player.hand[handIndex];

  if (!selectedCard) return;

  const hasEnoughEnergy = selectedCard.cost <= player.energy;
  const laneHasSpace = player.board[targetLane].length < 4;

  if (!hasEnoughEnergy || !laneHasSpace) return;

  player.energy -= selectedCard.cost;

  player.hand.splice(handIndex, 1);

  const newCard = {
    ...selectedCard,
    queued: true,
    revealed: false,
  };

  const laneCards = player.board[targetLane];

  /**
   * BARD EFFECT
   */
  laneCards.forEach((existingCard) => {
    if (existingCard.ability === "buff_next_card") {
      newCard.modifier += 2;
    }
  });

  laneCards.push(newCard);
}

export function getLanePower(cards: any[]) {
  return cards.reduce((totalPower, card) => {
    return totalPower + getCardPower(card);
  }, 0);
}

export function getTotalBoardPower(player: Player) {
  return Object.values(player.board).reduce((boardTotal, laneCards) => {
    return (
      boardTotal +
      laneCards.reduce((laneTotal, card) => {
        return laneTotal + getCardPower(card);
      }, 0)
    );
  }, 0);
}

export function getLaneWinner(playerOneCards: any[], playerTwoCards: any[]) {
  const playerOnePower = getLanePower(playerOneCards);

  const playerTwoPower = getLanePower(playerTwoCards);

  if (playerOnePower > playerTwoPower) return "player1";

  if (playerTwoPower > playerOnePower) return "player2";

  return "draw";
}

export function getGameWinner(state: GameState) {
  let playerOneLaneWins = 0;
  let playerTwoLaneWins = 0;

  for (const lane of state.lanes) {
    const result = getLaneWinner(
      state.players.player1.board[lane.id],
      state.players.player2.board[lane.id],
    );

    if (result === "player1") {
      playerOneLaneWins++;
    }

    if (result === "player2") {
      playerTwoLaneWins++;
    }
  }

  if (playerOneLaneWins >= 2) return "player1";

  if (playerTwoLaneWins >= 2) return "player2";

  const playerOneTotalPower = getTotalBoardPower(state.players.player1);

  const playerTwoTotalPower = getTotalBoardPower(state.players.player2);

  if (playerOneTotalPower > playerTwoTotalPower) {
    return "player1";
  }

  if (playerTwoTotalPower > playerOneTotalPower) {
    return "player2";
  }

  return "draw";
}
