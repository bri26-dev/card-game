import type { TurnPhase } from "@/engine/types";

type Props = {
  currentPhase: TurnPhase;

  onUndo: () => void;

  onEndTurn: () => void;

  onRestart: () => void;
};

export default function ActionBar({
  currentPhase,
  onUndo,
  onEndTurn,
  onRestart,
}: Props) {
  if (currentPhase === "end") {
    return (
      <footer className="pt-1 pb-[max(8px,env(safe-area-inset-bottom))]">
        <div className="pixel-panel p-3">
          <button
            onClick={onRestart}
            className="
              pixel-button
              w-full
              rounded-2xl
              border-emerald-400/20
              bg-emerald-500/20
              py-4
            "
          >
            <div
              className="
                text-[10px]
                uppercase
                tracking-[0.2em]
                text-emerald-200
              "
            >
              Match Complete
            </div>

            <div
              className="
                mt-1
                text-lg
                font-black
                uppercase
                tracking-[0.08em]
                text-white
              "
            >
              Play Again
            </div>
          </button>
        </div>
      </footer>
    );
  }

  return (
    <footer className="px-2 pb-2 pt-1">
      <div
        className="
      flex
      gap-2
      rounded-[24px]
      border
      border-white/10
      bg-gradient-to-b
      from-[#171e35]
      to-[#0c1020]
      p-2
    "
      >
        <button
          onClick={onUndo}
          className="
  flex-1
  rounded-[18px]
  border
  border-white/10
  bg-white/[0.04]
  py-2.5
"
        >
          <div
            className="
              text-xs
              font-bold
              uppercase
              tracking-[0.14em]
              text-zinc-300
            "
          >
            Undo
          </div>
        </button>

        <button
          onClick={onEndTurn}
          className="
  relative
  flex-[1.4]
  overflow-hidden
  rounded-[18px]
  border
  border-cyan-400/20
  bg-gradient-to-b
  from-cyan-500/30
  to-blue-500/20
  py-2.5
"
        >
          <div
            className="
              absolute
              inset-0
              bg-blue-400/10
              blur-xl
            "
          />

          <div className="relative w-full">
            <div
              className="
                text-[10px]
                uppercase
                tracking-[0.25em]
                text-blue-100
              "
            >
              Action
            </div>

            <div
              className="
                mt-1
                text-sm
                font-black
                uppercase
                tracking-[0.1em]
                text-white
              "
            >
              End Turn
            </div>
          </div>
        </button>
      </div>
    </footer>
  );
}
