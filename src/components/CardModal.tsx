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
        p-4
      "
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="
          w-52 h-78
          rounded-3xl
          border border-zinc-300
          bg-white
          shadow-2xl
          overflow-hidden
          flex flex-col
        "
      >
        {/* TOP */}
        <div className="p-3 flex justify-between items-start">
          {/* COST */}
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

          {/* POWER */}
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

        {/* ART */}
        <div className="px-3">
          <div
            className="
              h-28
              rounded-2xl
              border border-zinc-200
              bg-zinc-100
              flex items-center justify-center
            "
          >
            <div className="text-[10px] text-zinc-400 tracking-wide"></div>
          </div>
        </div>

        {/* INFO */}
        <div className="flex-1 flex flex-col justify-between p-6">
          {/* NAME */}
          <div className="text-center font-bold text-lg text-zinc-900">
            {card.name}
          </div>

          {/* DESCRIPTION */}
          <div
            className="
              mt-2
              p-2
              text-[12px]
              text-center
              text-zinc-600
              leading-relaxed
              flex items-center justify-center
            "
          >
            {card.description || "No ability."}
          </div>
        </div>
      </div>
    </div>
  );
}
