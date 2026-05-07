type Props = {
  lane: {
    name: string;
    description: string;
  };

  onClose: () => void;
};

export default function LaneModal({ lane, onClose }: Props) {
  return (
    <div
      className="
        fixed inset-0 z-[200]
        bg-black/60 backdrop-blur-sm
        flex items-center justify-center
        p-4
      "
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="
          w-full max-w-sm
          rounded-3xl
          bg-white
          overflow-hidden
          border border-zinc-200
          shadow-2xl
          flex flex-col
        "
      >
        {/* HEADER */}
        <div
          className="
            px-6 pt-6 pb-4
            flex items-center justify-center
          "
        >
          <div className="text-center">
            <div className="text-2xl font-black text-zinc-900 leading-tight">
              {lane.name}
            </div>
          </div>
        </div>

        {/* ART AREA */}
        <div
          className="
            h-36
            mx-5
            rounded-2xl
            border border-zinc-200
            bg-zinc-100
            flex items-center justify-center
          "
        >
          <div className="text-xs text-zinc-400 tracking-wide"></div>
        </div>

        {/* DESCRIPTION */}
        <div className="p-5 pt-4">
          <div
            className="
              p-4
              text-center
            "
          >
            <div className="text-sm leading-relaxed text-zinc-700">
              {lane.description}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
