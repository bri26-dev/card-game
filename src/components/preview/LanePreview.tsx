// components/preview/LanePreview.tsx

type Props = {
  lane: {
    name: string;
    description: string;
  };

  onClose: () => void;
};

export default function LanePreview({ lane, onClose }: Props) {
  return (
    <div
      onClick={onClose}
      className="
        fixed inset-0 z-[200]
        flex items-center justify-center
        bg-black/60 p-4 backdrop-blur-sm
      "
    >
      <div
        onClick={(event) => event.stopPropagation()}
        className="
          flex w-full max-w-sm flex-col overflow-hidden
          rounded-3xl border border-zinc-200
          bg-white shadow-2xl
        "
      >
        <div className="flex items-center justify-center px-6 pb-4 pt-6">
          <div className="text-center">
            <div className="text-2xl font-black leading-tight text-zinc-900">
              {lane.name}
            </div>
          </div>
        </div>

        <div className="mx-5 flex h-36 items-center justify-center rounded-2xl border border-zinc-200 bg-zinc-100" />

        <div className="p-5 pt-4">
          <div className="p-4 text-center">
            <div className="text-sm leading-relaxed text-zinc-700">
              {lane.description}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
