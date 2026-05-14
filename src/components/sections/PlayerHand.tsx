// components/sections/PlayerHand.tsx

import type { TouchEvent } from "react";

import type { Card } from "@/engine/types";

import GameCard from "../game/GameCard";

type Props = {
  cards: Card[];

  draggingIndex: number | null;

  isDragging: boolean;

  onCardPreview: (card: Card) => void;

  onTouchStart: (event: TouchEvent<HTMLDivElement>) => void;

  onTouchMove: (
    event: TouchEvent<HTMLDivElement>,
    card: Card,
    index: number,
  ) => void;

  onTouchEnd: () => void;
};

export default function PlayerHand({
  cards,
  draggingIndex,
  onCardPreview,
  onTouchStart,
  onTouchMove,
  onTouchEnd,
}: Props) {
  return (
    <section className="w-full">
      <div
        className="
          relative
          overflow-hidden

          rounded-[32px]
          border
          border-white/10

          bg-[linear-gradient(180deg,#182444_0%,#0b1020_100%)]

          px-2
          py-4

          shadow-[0_18px_50px_rgba(0,0,0,.45)]
        "
      >
        {/* SHINE */}
        <div
          className="
            absolute
            inset-0
            bg-[linear-gradient(180deg,rgba(255,255,255,0.06),transparent)]
          "
        />

        <div
          className="
            relative
            flex
            min-h-[92px]
            items-end
            justify-center
          "
        >
          {cards.map((card, index) => {
            const total = cards.length;

            const spread = total <= 3 ? 48 : total <= 5 ? 36 : 28;

            const overlap = total <= 5 ? -20 : -28;

            const centerOffset = index - (total - 1) / 2;

            const offset = centerOffset * spread;

            const rotation = centerOffset * 4;

            return (
              <div
                key={card.id}
                className="
                  relative
                  transition-all
                  duration-150
                  hover:z-50
                  hover:-translate-y-3
                "
                style={{
                  transform: `
                    translateX(${offset}px)
                    rotate(${rotation}deg)
                  `,
                  marginLeft: index === 0 ? 0 : overlap,
                  zIndex: index + 1,
                }}
              >
                <div className={draggingIndex === index ? "opacity-0" : ""}>
                  <GameCard
                    card={card}
                    onTouchStart={onTouchStart}
                    onTouchMove={(event) => onTouchMove(event, card, index)}
                    onTouchEnd={onTouchEnd}
                    onClick={() => onCardPreview(card)}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
