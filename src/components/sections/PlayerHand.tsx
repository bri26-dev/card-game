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
    <section className="w-full pt-1">
      <div
        className="
relative
overflow-hidden

rounded-[30px]
border
border-white/10

bg-gradient-to-b
from-[#1b2344]
to-[#0b1020]

px-2
py-[clamp(16px,2vh,22px)]

shadow-[0_18px_50px_rgba(0,0,0,.4)]
"
      >
        {/* GRID */}
        <div
          className="
            absolute
            inset-0
            opacity-[0.05]
          "
          style={{
            backgroundImage: `
              linear-gradient(to right, white 1px, transparent 1px),
              linear-gradient(to bottom, white 1px, transparent 1px)
            `,
            backgroundSize: "8px 8px",
          }}
        />

        <div
          className="
            relative
            flex
            items-end
            justify-center
            min-h-[92px]
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
