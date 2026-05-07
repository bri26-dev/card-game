// components/CardModal.tsx

type Props = {
  card: any;
  onClose: () => void;
};

export default function CardModal({ card, onClose }: Props) {
  if (!card) return null;

  const finalPower = card.basePower + card.modifier;

  return (
    <div
      className="
        fixed inset-0 z-50
        bg-black/70 backdrop-blur-sm
        flex items-center justify-center
      "
      onClick={onClose}
    >
      {/* CARD */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="
          w-44 h-64
          rounded-2xl
          border-2 border-zinc-300
          bg-white
          shadow-2xl
          p-3
          flex flex-col
          relative
        "
      >
        {/* TOP STATS */}
        <div className="flex justify-between items-start">
          <div
            className="
              w-9 h-9 rounded-full
              bg-sky-500 text-white
              flex items-center justify-center
              text-lg font-bold
              shadow
            "
          >
            {card.cost}
          </div>

          <div
            className={`
              w-9 h-9 rounded-full
              flex items-center justify-center
              text-lg font-bold
              shadow
              ${
                finalPower > card.basePower
                  ? "bg-green-500 text-white"
                  : finalPower < card.basePower
                    ? "bg-red-500 text-white"
                    : "bg-zinc-800 text-white"
              }
            `}
          >
            {finalPower}
          </div>
        </div>

        {/* ART AREA */}
        <div
          className="
            flex-1 my-3
            flex items-center justify-center
          "
        ></div>

        {/* NAME */}
        <div className="text-center font-bold text-sm mb-2">{card.name}</div>

        {/* DESCRIPTION */}
        <div
          className="
            text-[11px]
            text-center
            text-zinc-600
            leading-tight
            min-h-[40px]
          "
        >
          {card.description || "No ability."}
        </div>
      </div>
    </div>
  );
}
