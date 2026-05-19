// components/sections/PlayerHand.tsx

import type { TouchEvent } from "react";

import type { Card } from "@/engine/types/types";

import GameCard from "../GameCard";

type Props = {
  cards: Card[];

  draggingIndex: number | null;

  isDragging: boolean;

  disableDragging?: boolean;

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
  disableDragging,
}: Props) {
  const total = cards.length;

  /**
   * DYNAMIC HAND SPACING
   *
   * Instead of overflowing outside screen width,
   * cards compress inward smoothly as hand grows.
   */

  const getSpacing = () => {
    if (total <= 3) return 58;

    if (total === 4) return 48;

    if (total === 5) return 40;

    if (total === 6) return 32;

    if (total === 7) return 24;

    return 18;
  };

  const spacing = getSpacing();

  const rotationStrength =
    total <= 4 ? 4 : total <= 6 ? 3 : total <= 8 ? 2 : 1.5;

  const scale = total <= 5 ? 0.92 : total <= 7 ? 0.86 : total <= 9 ? 0.8 : 0.74;

  return (
    <section className="w-full shrink-0">
      <div
        className="
          relative
          overflow-hidden

          px-2
          py-3
        "
      >
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
            const centerOffset = index - (total - 1) / 2;

            const offsetX = centerOffset * spacing;

            const rotation = centerOffset * rotationStrength;

            const normalized =
              total <= 1 ? 0 : centerOffset / ((total - 1) / 2);

            /**
             * SMOOTH SNAP-LIKE ARC
             */
            const raise = Math.pow(Math.abs(normalized), 1.7) * 14;

            return (
              <div
                key={card.id}
                className="
                  relative

                  transition-all
                  duration-300
                  ease-out

                  hover:z-50
                  hover:-translate-y-4
                "
                style={{
                  transform: `
                    translateX(${offsetX}px)
                    translateY(${raise}px)
                    rotate(${rotation}deg)
                    scale(${scale})
                  `,
                  marginLeft: index === 0 ? 0 : -52,
                  zIndex: index + 1,
                }}
              >
                <div
                  className={`
                    transition-all
                    duration-200

                    ${
                      draggingIndex === index
                        ? "scale-95 opacity-0"
                        : "opacity-100"
                    }
                  `}
                >
                  <GameCard
                    card={card}
                    onTouchStart={disableDragging ? undefined : onTouchStart}
                    onTouchMove={
                      disableDragging
                        ? undefined
                        : (event) => onTouchMove(event, card, index)
                    }
                    onTouchEnd={disableDragging ? undefined : onTouchEnd}
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
