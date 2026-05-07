import type { TouchEvent } from "react";

type Props = {
  name: string;
  cost: number;
  power: number;
  basePower: number;
  modifier?: number;

  queued?: boolean;
  revealed?: boolean;

  selected?: boolean;

  onClick?: () => void;
  onTouchStart?: (e: TouchEvent) => void;
  onTouchMove?: (e: TouchEvent) => void;
  onTouchEnd?: (e: TouchEvent) => void;
};

export default function Card({
  name,
  cost,
  power,
  basePower,
  modifier = 0,
  queued,
  revealed,
  selected,
  onClick,
  onTouchStart,
  onTouchMove,
  onTouchEnd,
}: Props) {
  const finalPower = basePower + modifier;

  const diff = finalPower - basePower;

  const isBuffed = diff > 0;
  const isDebuffed = diff < 0;

  return (
    <div
      onClick={onClick}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      className={`
        w-14 h-20 rounded-xl border bg-white p-1 shadow-sm
        ${selected ? "scale-105" : ""}
        ${queued ? "border-blue-400" : "border-zinc-300"}
      `}
    >
      {!revealed && queued ? (
        <div className="w-full h-full flex items-center justify-center text-[10px] font-bold text-blue-500"></div>
      ) : (
        <>
          <div className="flex justify-between text-xs font-bold">
            <div className="text-sky-600">{cost}</div>

            <div
              className={
                isBuffed
                  ? "text-green-600"
                  : isDebuffed
                    ? "text-red-600"
                    : "text-black"
              }
            >
              {finalPower}
            </div>
          </div>

          <div className="h-full flex items-center justify-center text-[10px] font-semibold">
            {name}
          </div>
        </>
      )}
    </div>
  );
}
