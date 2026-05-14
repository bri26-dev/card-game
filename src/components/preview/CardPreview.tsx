// components/preview/CardPreview.tsx

import Image from "next/image";

import type { Card } from "@/engine/types";

import { getCardPower } from "@/engine/utils/card.utils";

type Props = {
  card: Card & {
    image?: string;
  };

  onClose: () => void;
};

export default function CardPreview({ card, onClose }: Props) {
  const totalPower = getCardPower(card);

  return (
    <div
      onClick={onClose}
      className="
        fixed
        inset-0
        z-[200]
        flex
        items-center
        justify-center
        bg-black/80
        p-4
        backdrop-blur-md
      "
    >
      <div
        onClick={(event) => event.stopPropagation()}
        className="
          relative
          h-[560px]
          w-[360px]
          overflow-hidden
          rounded-[38px]
          border
          border-white/10
          bg-[#101014]
          shadow-[0_30px_80px_rgba(0,0,0,0.6)]
        "
      >
        <Image
          src={card.image || "/assets/cards/fallback.png"}
          alt={card.name}
          fill
          className="object-cover pixelated"
        />

        <div
          className="
            absolute
            inset-0
            bg-gradient-to-b
            from-black/10
            via-black/20
            to-black
          "
        />

        <div
          className="
            absolute
            left-4
            top-4
            flex
            h-14
            w-14
            items-center
            justify-center
            rounded-full
            bg-blue-500
            text-2xl
            font-black
            text-white
          "
        >
          {card.cost}
        </div>

        <div
          className="
            absolute
            top-4
            right-4
            flex
            h-14
            w-14
            items-center
            justify-center
            rounded-full
            bg-zinc-900
            text-2xl
            font-black
            text-white
          "
        >
          {totalPower}
        </div>

        <div
          className="
            absolute
            bottom-0
            left-0
            right-0
            p-6
          "
        >
          <div
            className="
              text-3xl
              font-black
              uppercase
              text-white
            "
          >
            {card.name}
          </div>

          <div
            className="
              mt-4
              rounded-2xl
              border
              border-white/10
              bg-black/40
              p-4
              text-sm
              leading-relaxed
              text-zinc-300
              backdrop-blur
            "
          >
            {card.description || "No Ability."}
          </div>
        </div>
      </div>
    </div>
  );
}
