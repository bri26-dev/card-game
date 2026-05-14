// components/game/GameLane.tsx

import Image from "next/image";
import type { MutableRefObject } from "react";

import type { Card, Lane, LaneKey } from "@/engine/types";

import GameCard from "./GameCard";

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
  const isMoveTarget = movingCard !== null && movingCard?.fromLane !== lane.id;

  const enemySlots: (Card | null)[] = [
    enemyCards[0] ?? null,
    enemyCards[1] ?? null,
    enemyCards[2] ?? null,
    enemyCards[3] ?? null,
  ];

  const playerSlots: (Card | null)[] = [
    playerCards[0] ?? null,
    playerCards[1] ?? null,
    playerCards[2] ?? null,
    playerCards[3] ?? null,
  ];

  const displayedImage = lane.revealed
    ? lane.image || "/assets/lanes/fallback.png"
    : "/assets/lanes/unrevealed.png";

  return (
    <div
      className="
      relative
      flex
      h-[470px]
      w-[102px]
      flex-col
      items-center
    "
    >
      {/* ENEMY */}
      <div
        className="
        relative
        mb-3
        grid
        grid-cols-2
        gap-[7px]
      "
      >
        {enemySlots.map((card, index) => (
          <div
            key={`enemy-${index}`}
            className="
            flex
            h-[66px]
            w-[46px]
            items-center
            justify-center
          "
          >
            {card ? (
              <div className="scale-[0.57]">
                <GameCard card={card} onClick={() => onCardSelect(card)} />
              </div>
            ) : (
              <div
                className="
                h-[64px]
                w-[46px]
                rounded-[16px]
                border
                border-dashed
                border-[#8ea2ff]/10
                bg-[#09111f]/55
              "
              />
            )}
          </div>
        ))}
      </div>

      {/* LOCATION WRAPPER */}
      <div className="relative py-[12px]">
        {/* TOP SCORE */}
        <div
          className={`
          absolute
          left-1/2
          top-3
          z-50
          flex
          h-6
          min-w-[30px]
          -translate-x-1/2
          -translate-y-1/2
          items-center
          justify-center
          rounded-full
          border
          px-2
          text-[10px]
          font-black
          text-white
          shadow-lg

          ${
            result === "player2"
              ? "bg-red-500 border-red-300/30"
              : "bg-[#0f1729] border-white/10"
          }
        `}
        >
          {enemyPower}
        </div>

        {/* BOTTOM SCORE */}
        <div
          className={`
          absolute
          bottom-3
          left-1/2
          z-50
          flex
          h-6
          min-w-[30px]
          -translate-x-1/2
          translate-y-1/2
          items-center
          justify-center
          rounded-full
          border
          px-2
          text-[10px]
          font-black
          text-white
          shadow-lg

          ${
            result === "player1"
              ? "bg-emerald-500 border-emerald-300/30"
              : "bg-[#0f1729] border-white/10"
          }
        `}
        >
          {playerPower}
        </div>

        {/* LOCATION */}
        <div
          ref={laneRef}
          onClick={() => {
            if (movingCard && onMoveCard) {
              onMoveCard(movingCard.fromLane, lane.id, movingCard.cardId);

              onSelectMoveCard?.(null);

              return;
            }

            onLaneSelect(lane);
          }}
          className={`
          group
          relative
          h-[142px]
          w-[102px]
          cursor-pointer
          overflow-hidden
          transition-all
          duration-200

          ${isMoveTarget ? "scale-[1.04]" : ""}
        `}
          style={{
            clipPath:
              "polygon(14% 0%,86% 0%,100% 18%,100% 82%,86% 100%,14% 100%,0% 82%,0% 18%)",
          }}
        >
          {/* FRAME */}
          <div
            className={`
            absolute
            inset-0
            border
            bg-[linear-gradient(180deg,#1a2750_0%,#0a1020_100%)]

            ${
              result === "player1"
                ? "border-emerald-400/40"
                : result === "player2"
                  ? "border-red-400/40"
                  : "border-[#8ea2ff]/18"
            }

            ${isMoveTarget ? "animate-pulse border-cyan-300/60" : ""}
          `}
          />

          <Image
            src={displayedImage}
            alt={lane.name}
            fill
            className="
              object-cover
              opacity-90
              transition-transform
              duration-300
              group-hover:scale-105
            "
          />

          <div
            className="
            absolute
            inset-0
            bg-gradient-to-b
            from-[#0b1020]/10
            via-[#0b1020]/35
            to-[#0b1020]/88
          "
          />

          {!lane.revealed && (
            <div
              className="
              absolute
              inset-0
              bg-black/40
              backdrop-blur-[2px]
            "
            />
          )}

          {/* TEXT */}
          <div
            className="
            relative
            z-10
            flex
            h-full
            flex-col
            items-center
            justify-center
            px-2
            text-center
          "
          >
            <div
              className="
              text-[12px]
              font-black
              uppercase
              tracking-[0.12em]
              text-white
            "
            >
              {lane.revealed ? lane.name : "Hidden"}
            </div>

            <div
              className="
              mt-2
              max-w-[80px]
              text-[8px]
              leading-relaxed
              text-zinc-200
            "
            >
              {lane.revealed ? lane.description : "Reveals Soon"}
            </div>
          </div>
        </div>
      </div>

      {/* PLAYER */}
      <div
        className="
        relative
        mt-3
        grid
        grid-cols-2
        gap-[7px]
      "
      >
        {playerSlots.map((card, index) => (
          <div
            key={`player-${index}`}
            className="
            flex
            h-[66px]
            w-[46px]
            items-center
            justify-center
          "
          >
            {card ? (
              <div className="scale-[0.57]">
                <GameCard
                  card={card}
                  onClick={() => {
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
            ) : (
              <div
                className="
                h-[64px]
                w-[46px]
                rounded-[16px]
                border
                border-dashed
                border-[#8ea2ff]/10
                bg-[#09111f]/55
              "
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
