// components/game/GameCard.tsx

import Image from "next/image";

import type { TouchEvent } from "react";

import type { Card } from "@/engine/types/types";

import { getCardPower } from "@/engine/utils/card.utils";

type Props = {
  card: Card & {
    image?: string;
  };

  compact?: boolean;

  selected?: boolean;

  onClick?: () => void;

  onTouchStart?: (event: TouchEvent<HTMLDivElement>) => void;

  onTouchMove?: (event: TouchEvent<HTMLDivElement>) => void;

  onTouchEnd?: (event: TouchEvent<HTMLDivElement>) => void;
};

export default function GameCard({
  card,
  compact = false,
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
        overflow-hidden
        rounded-[18px]
        border
        border-white/10
        bg-[#111827]
        transition-all
        duration-150

        ${
          compact
            ? `
              h-[82px]
              w-[58px]
            `
            : `
              h-[104px]
              w-[74px]
            `
        }

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
          sizes={compact ? "58px" : "74px"}
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
        className={`
          absolute
          left-1.5
          top-1.5
          z-20
          flex
          items-center
          justify-center
          rounded-full
          border
          border-cyan-200/20
          bg-[#4d8fff]
          font-black
          text-white

          ${
            compact
              ? `
                h-4
                w-4
                text-[8px]
              `
              : `
                h-5
                w-5
                text-[10px]
              `
          }
        `}
      >
        {card.cost}
      </div>

      {/* POWER */}
      <div
        className={`
          absolute
          right-1.5
          top-1.5
          z-20
          flex
          items-center
          justify-center
          rounded-full
          border
          font-black
          text-white

          ${
            compact
              ? `
                h-4
                w-4
                text-[8px]
              `
              : `
                h-5
                w-5
                text-[10px]
              `
          }

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
      <div className="absolute bottom-1 left-1 right-1 z-10">
        <div
          className={`
            truncate
            text-center
            font-black
            uppercase
            tracking-[0.06em]
            text-white

            ${compact ? "text-[7px]" : "text-[10px]"}
          `}
        >
          {card.name}
        </div>
      </div>
    </div>
  );
}
