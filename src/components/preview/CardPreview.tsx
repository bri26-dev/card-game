// components/preview/CardPreview.tsx

import type { Card } from "@/engine/types";

import { getCardPower } from "@/engine/utils/card.utils";

type Props = {
  card: Card;

  onClose: () => void;
};

export default function CardPreview({ card, onClose }: Props) {
  const totalPower = getCardPower(card);

  return (
    <div
      onClick={onClose}
      className="
        fixed inset-0 z-50
        flex items-center justify-center
        bg-black/70 p-4 backdrop-blur-sm
      "
    >
      <div
        onClick={(event) => event.stopPropagation()}
        className="
          flex h-[35%] w-52 flex-col overflow-hidden
          rounded-3xl border border-zinc-300
          bg-white shadow-2xl
        "
      >
        <div className="flex items-start justify-between p-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-sky-500 text-lg font-bold text-white shadow">
            {card.cost}
          </div>

          <div
            className={`
              flex h-9 w-9 items-center justify-center
              rounded-full text-lg font-bold text-white shadow

              ${
                totalPower > card.basePower
                  ? "bg-green-500"
                  : totalPower < card.basePower
                    ? "bg-red-500"
                    : "bg-zinc-800"
              }
            `}
          >
            {totalPower}
          </div>
        </div>

        <div className="px-3">
          <div className="flex h-28 items-center justify-center rounded-2xl border border-zinc-200 bg-zinc-100" />
        </div>

        <div className="flex flex-1 flex-col justify-between p-6">
          <div className="text-center text-lg font-bold text-zinc-900">
            {card.name}
          </div>

          <div className="mt-2 flex items-center justify-center p-2 text-center text-[12px] leading-relaxed text-zinc-600">
            {card.description || "No ability."}
          </div>
        </div>
      </div>
    </div>
  );
}
