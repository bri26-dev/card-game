// components/game/GameCard.tsx

import Image from "next/image";

import type { TouchEvent } from "react";

import type { Card } from "@/engine/types";

import { getCardPower } from "@/engine/utils/card.utils";

type Props = {
  card: Card & {
    image?: string;
  };

  selected?: boolean;

  onClick?: () => void;

  onTouchStart?: (event: TouchEvent<HTMLDivElement>) => void;

  onTouchMove?: (event: TouchEvent<HTMLDivElement>) => void;

  onTouchEnd?: (event: TouchEvent<HTMLDivElement>) => void;
};

export default function GameCard({
  card,
  selected,
  onClick,
  onTouchStart,
  onTouchMove,
  onTouchEnd,
}: Props) {
  const totalPower = getCardPower(card);

  const powerDifference = totalPower - card.basePower;

  const isBuffed = powerDifference > 0;

  const isDebuffed = powerDifference < 0;

  return (
    <div
      onClick={onClick}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      className={`
        group
        relative
        h-[104px]
        w-[74px]
        overflow-hidden
        rounded-[18px]
        transition-all
        duration-150

        ${
          selected
            ? "scale-105 border-cyan-300 shadow-[0_0_18px_rgba(90,180,255,0.4)]"
            : "active:scale-95"
        }
      `}
    >
      {/* IMAGE */}
      <div
        className="
          absolute
          inset-[3px]
          overflow-hidden
          rounded-[14px]
        "
      >
        <Image
          src={card.image || "/assets/cards/fallback.png"}
          alt={card.name}
          fill
          className="
            object-cover
            pixelated
          "
        />

        <div
          className="
            absolute
            inset-0
            bg-gradient-to-b
            from-black/0
            via-black/10
            to-black/80
          "
        />
      </div>

      {/* COST */}
      <div
        className="
          absolute
          left-1.5
          top-1.5
          z-20
          flex
          h-5
          w-5
          items-center
          justify-center
          rounded-[10px]
          border
          border-cyan-200/20
          bg-[#4d8fff]
          text-[10px]
          font-black
          text-white
          shadow-[0_0_12px_rgba(80,120,255,0.45)]
        "
      >
        {card.cost}
      </div>

      {/* POWER */}
      <div
        className={`
          absolute
          top-1.5
          right-1.5
          z-20
          flex
          h-5
          w-5
          items-center
          justify-center
          rounded-[10px]
          border
          text-[10px]
          font-black
          text-white

          ${
            isBuffed
              ? "border-green-300/20 bg-green-500"
              : isDebuffed
                ? "border-red-300/20 bg-red-500"
                : "border-white/10 bg-[#151b2f]"
          }
        `}
      >
        {totalPower}
      </div>

      {/* NAME */}
      <div
        className="
          absolute
          bottom-1.5
          left-1
          right-1
          z-10
        "
      >
        <div
          className="
            text-center
            text-[10px]
            font-black
            uppercase
            tracking-[0.08em]
            text-white
            drop-shadow-[0_2px_0_rgba(0,0,0,0.7)]
          "
        >
          {card.name}
        </div>
      </div>
    </div>
  );
}
