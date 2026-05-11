// components/game/GameLane.tsx

import type { MutableRefObject } from "react";
import type { Card, Lane, LaneKey } from "@/engine/types";

import GameCard from "./GameCard";
import { getLaneEffectText } from "@/engine/effects/laneEffects";

type Props = {
  lane: Lane;

  playerCards: Card[];
  enemyCards: Card[];

  playerPower: number;
  enemyPower: number;

  result: "player1" | "player2" | "draw";

  laneRef: MutableRefObject<HTMLDivElement | null>;

  onCardSelect: (card: Card) => void;
  onLaneSelect: (lane: Lane) => void;

  // ✅ ADDED
  movingCard?: {
    cardId: string;
    fromLane: LaneKey;
  } | null;

  onMoveCard?: (fromLane: LaneKey, toLane: LaneKey, cardId: string) => void;

  onSelectMoveCard?: (
    value: {
      cardId: string;
      fromLane: LaneKey;
    } | null,
  ) => void;
};

export default function GameLane({
  lane,
  playerCards,
  enemyCards,
  playerPower,
  enemyPower,
  result,
  laneRef,
  onCardSelect,
  onLaneSelect,
  movingCard,
  onMoveCard,
  onSelectMoveCard,
}: Props) {
  const isMoveTarget = movingCard && movingCard.fromLane !== lane.id;

  return (
    <div className="flex h-[320px] w-[110px] flex-col items-center">
      {/* ENEMY */}
      <div className="flex h-[110px] flex-col items-center justify-end">
        <div className="grid grid-cols-2 gap-[2px]">
          {enemyCards.map((card) => (
            <div key={card.id} className="scale-[0.5]">
              {card.revealed ? (
                <GameCard card={card} onClick={() => onCardSelect(card)} />
              ) : (
                <div className="h-24 w-16 rounded-xl border border-blue-400 bg-blue-900" />
              )}
            </div>
          ))}
        </div>

        <div className="mb-[2px] text-[10px]">
          ({enemyPower}) {result === "player2" ? "✓" : ""}
        </div>
      </div>

      {/* LOCATION */}
      <div
        ref={laneRef}
        onClick={() => {
          // ✅ MOVE LOGIC
          if (movingCard && onMoveCard) {
            onMoveCard(movingCard.fromLane, lane.id, movingCard.cardId);

            onSelectMoveCard?.(null);
            return;
          }

          onLaneSelect(lane);
        }}
        className={`
          flex h-[60px] w-full flex-col items-center
          justify-center rounded border text-[10px]
          transition-all

          ${
            result === "player1"
              ? "border-green-400 bg-green-50"
              : result === "player2"
                ? "border-red-400 bg-red-50"
                : "border-gray-300 bg-white"
          }

          ${isMoveTarget ? "ring-2 ring-blue-500" : ""}
        `}
      >
        {lane.revealed ? (
          <>
            <div className="font-semibold leading-tight">{lane.name}</div>

            <div className="p-1 text-center text-[8px] leading-tight text-gray-500">
              {getLaneEffectText(lane.effect)}
            </div>
          </>
        ) : (
          <div className="text-[9px] italic text-gray-400">Hidden Location</div>
        )}
      </div>

      {/* PLAYER */}
      <div className="flex h-[110px] flex-col items-center justify-start">
        <div className="mt-[2px] text-[10px]">
          ({playerPower}) {result === "player1" ? "✓" : ""}
        </div>

        <div className="grid grid-cols-2 gap-[2px]">
          {playerCards.map((card) => (
            <div key={card.id} className="scale-[0.5]">
              <GameCard
                card={card}
                onClick={() => {
                  // ✅ START MOVE MODE
                  if (card.ability === "move_once" && !card.moved) {
                    onSelectMoveCard?.({
                      cardId: card.id,
                      fromLane: lane.id,
                    });
                    return;
                  }

                  onCardSelect(card);
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
