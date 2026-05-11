// components/game/sections/PlayerHand.tsx

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
    <section className="relative h-32 overflow-hidden border-t bg-white">
      <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 items-end">
        {cards.map((card, index) => {
          const total = cards.length;

          const offset = (index - (total - 1) / 2) * 32;

          const rotation = (index - (total - 1) / 2) * 6;

          const lift = Math.abs(index - (total - 1) / 2) * -2;

          return (
            <div
              key={card.id}
              className="relative transition-all duration-150"
              style={{
                transform: `
                  translateX(${offset}px)
                  translateY(${lift}px)
                  rotate(${rotation}deg)
                `,
                marginLeft: index === 0 ? 0 : -28,
                zIndex: index,
              }}
            >
              <button
                onClick={() => onCardPreview(card)}
                className="
                  absolute
                  bottom-[-8px]
                  left-1/2
                  z-20
                  flex
                  h-5
                  w-5
                  -translate-x-1/2
                  items-center
                  justify-center
                  rounded-full
                  bg-black/80
                  text-[10px]
                  text-white
                  shadow
                "
              >
                👁
              </button>

              <div
                className={
                  draggingIndex === index
                    ? "opacity-0 transition-all"
                    : "transition-all"
                }
              >
                <GameCard
                  card={card}
                  onTouchStart={onTouchStart}
                  onTouchMove={(event) => onTouchMove(event, card, index)}
                  onTouchEnd={onTouchEnd}
                />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
