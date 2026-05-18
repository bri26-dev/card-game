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
    <section className="w-full shrink-0">
      <div
        className="
          relative
          overflow-hidden

          px-1
          py-3
        "
      >
        <div
          className="
            relative
            flex
            min-h-[78px]
            items-end
            justify-center
          "
        >
          {cards.map((card, index) => {
            const total = cards.length;

            const spread = total <= 3 ? 42 : total <= 5 ? 30 : 22;

            const overlap = total <= 5 ? -26 : -34;

            const centerOffset = index - (total - 1) / 2;

            const offset = centerOffset * spread;

            const rotation = centerOffset * 3.5;

            return (
              <div
                key={card.id}
                className={`
                  relative
                  transition-all
                  duration-150
                  hover:z-50
                  hover:-translate-y-2
                  anim-card-idle
                  anim-card-draw
                `}
                style={{
                  transform: `
                    translateX(${offset}px)
                    rotate(${rotation}deg)
                    scale(0.88)
                  `,
                  marginLeft: index === 0 ? 0 : overlap,
                  zIndex: index + 1,
                  animationDelay: `${index * 40}ms`,
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
