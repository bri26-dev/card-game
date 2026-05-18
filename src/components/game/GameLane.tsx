// components/game/GameLane.tsx

import Image from "next/image";
import type { MutableRefObject } from "react";

import type { Card, Lane, LaneKey } from "@/engine/types/types";

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

  /**
   * PLAYER NORMAL ORDER
   *
   * [0][1]
   * [2][3]
   */

  const playerSlots: (Card | null)[] = [
    playerCards[0] ?? null,
    playerCards[1] ?? null,
    playerCards[2] ?? null,
    playerCards[3] ?? null,
  ];

  /**
   * ENEMY MIRRORED ORDER
   *
   * [2][3]
   * [0][1]
   */

  const enemySlots: (Card | null)[] = [
    enemyCards[2] ?? null,
    enemyCards[3] ?? null,
    enemyCards[0] ?? null,
    enemyCards[1] ?? null,
  ];

  const displayedImage = lane.revealed
    ? lane.image || "/assets/lanes/fallback.png"
    : "/assets/lanes/unrevealed.png";

  const hiddenText =
    lane.id === "lane2"
      ? "Reveals Turn 2"
      : lane.id === "lane3"
        ? "Reveals Turn 3"
        : "Reveals Soon";

  return (
    <div
      className="
        relative
        flex
        h-[420px]
        w-[108px]
        flex-col
        items-center

        sm:h-[455px]
        sm:w-[116px]
      "
    >
      {/* ENEMY */}
      <div
        className="
          relative
          mb-2
          grid
          grid-cols-2
          gap-[6px]
        "
      >
        {enemySlots.map((card, index) => (
          <div
            key={`enemy-${index}`}
            className="
              flex
              h-[60px]
              w-[44px]
              items-center
              justify-center

              sm:h-[66px]
              sm:w-[46px]
            "
          >
            {card ? (
              <div className="scale-[0.54] sm:scale-[0.57]">
                <GameCard card={card} onClick={() => onCardSelect(card)} />
              </div>
            ) : (
              <div className="h-[60px] w-[44px] sm:h-[66px] sm:w-[46px]" />
            )}
          </div>
        ))}
      </div>

      {/* LOCATION */}
      <div className="relative py-[10px]">
        {/* TOP SCORE */}
        <div
          className={`
            absolute
            left-1/2
            top-2
            z-50
            flex
            h-6
            min-w-[34px]
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
            backdrop-blur-md

            ${
              result === "player2"
                ? "border-red-300/40 bg-red-500"
                : "border-white/10 bg-[#10182c]"
            }
          `}
        >
          {enemyPower}
        </div>

        {/* BOTTOM SCORE */}
        <div
          className={`
            absolute
            bottom-2
            left-1/2
            z-50
            flex
            h-6
            min-w-[34px]
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
            backdrop-blur-md

            ${
              result === "player1"
                ? "border-emerald-300/40 bg-emerald-500"
                : "border-white/10 bg-[#10182c]"
            }
          `}
        >
          {playerPower}
        </div>

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

            h-[128px]
            w-[124px]

            sm:h-[138px]
            sm:w-[116px]

            cursor-pointer
            overflow-hidden

            rounded-[28px]

            transition-all
            duration-200

            ${isMoveTarget ? "scale-[1.03]" : ""}
          `}
        >
          {/* FRAME */}
          <div
            className={`
              absolute
              inset-0

              rounded-[28px]
              border

              bg-[linear-gradient(180deg,#1b2850_0%,#0a1020_100%)]

              ${
                result === "player1"
                  ? "border-emerald-400/40"
                  : result === "player2"
                    ? "border-red-400/40"
                    : "border-cyan-200/10"
              }

              ${isMoveTarget ? "animate-pulse border-cyan-300/70" : ""}
            `}
          />

          <Image
            src={displayedImage}
            alt={lane.name}
            fill
            sizes="(max-width: 640px) 124px, 116px"
            className="
              object-cover
              opacity-90

              transition-transform
              duration-300

              group-hover:scale-105
            "
          />

          {/* OVERLAY */}
          <div
            className="
              absolute
              inset-0

              bg-gradient-to-b
              from-[#0a1020]/10
              via-[#0a1020]/45
              to-[#0a1020]/92
            "
          />

          {!lane.revealed && (
            <div
              className="
                absolute
                inset-0
                bg-black/40
                backdrop-blur-[3px]
              "
            />
          )}

          {/* CONTENT */}
          <div
            className="
              relative
              z-10

              flex
              h-full
              flex-col
              items-center
              justify-end

              px-3
              pb-4

              text-center
            "
          >
            <div
              className="
                text-[12px]
                font-black
                uppercase
                tracking-[0.08em]
                text-white

                sm:text-[13px]
              "
            >
              {lane.revealed ? lane.name : "Hidden"}
            </div>

            <div
              className="
                mt-2

                max-w-[92px]

                text-[8px]
                leading-[1.45]

                text-zinc-200

                sm:max-w-[100px]
                sm:text-[9px]
              "
            >
              {lane.revealed ? lane.description : hiddenText}
            </div>
          </div>
        </div>
      </div>

      {/* PLAYER */}
      <div
        className="
          relative
          mt-2
          grid
          grid-cols-2
          gap-[6px]
        "
      >
        {playerSlots.map((card, index) => (
          <div
            key={`player-${index}`}
            className="
              flex
              h-[60px]
              w-[44px]
              items-center
              justify-center

              sm:h-[66px]
              sm:w-[46px]
            "
          >
            {card ? (
              <div className="scale-[0.54] sm:scale-[0.57]">
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
              <div className="h-[60px] w-[44px] sm:h-[66px] sm:w-[46px]" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
