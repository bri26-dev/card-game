// components/game/GameCard.tsx

import type { TouchEvent } from "react";

import type { Card } from "@/engine/types";

import { getCardPower } from "@/engine/utils/card.utils";

type Props = {
  card: Card;

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
        h-20 w-14 rounded-xl border bg-white p-1 shadow-sm
        transition-all duration-150
        ${selected ? "scale-105" : ""}
        ${card.queued ? "border-blue-400" : "border-zinc-300"}
      `}
    >
      {!card.revealed && card.queued ? (
        <div className="flex h-full items-center justify-center rounded-lg bg-blue-950">
          <div className="text-[9px] font-bold tracking-widest text-blue-300">
            ?
          </div>
        </div>
      ) : (
        <>
          <div className="flex justify-between text-xs font-bold">
            <div className="text-sky-600">{card.cost}</div>

            <div
              className={
                isBuffed
                  ? "text-green-600"
                  : isDebuffed
                    ? "text-red-600"
                    : "text-black"
              }
            >
              {totalPower}
            </div>
          </div>

          <div className="flex h-full items-center justify-center text-center text-[10px] font-semibold leading-tight">
            {card.name}
          </div>
        </>
      )}
    </div>
  );
}
