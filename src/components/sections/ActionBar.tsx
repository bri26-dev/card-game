// components/sections/ActionBar.tsx

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
      <footer className="shrink-0">
        <div
          className="
            rounded-[24px]
            border
            border-white/10

            bg-[#0c1324]/90

            p-2

            backdrop-blur-xl

            shadow-[0_12px_30px_rgba(0,0,0,.4)]
          "
        >
          <button
            onClick={onRestart}
            className="
              w-full

              rounded-[18px]
              border
              border-emerald-300/20

              bg-emerald-500/15

              py-3

              active:scale-[0.98]
            "
          >
            <div
              className="
                text-[9px]
                uppercase
                tracking-[0.2em]
                text-emerald-100
              "
            >
              Match Complete
            </div>

            <div
              className="
                mt-1
                text-base
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
    <footer className="shrink-0">
      <div
        className="
          relative
          flex
          gap-2

          rounded-[24px]
          border
          border-white/10

          bg-[#0c1324]/92

          p-2

          backdrop-blur-xl

          shadow-[0_12px_30px_rgba(0,0,0,.45)]
        "
      >
        {/* SHINE */}
        <div
          className="
            absolute
            inset-0

            rounded-[24px]

            bg-[linear-gradient(180deg,rgba(255,255,255,0.04),transparent)]
          "
        />

        {/* UNDO */}
        <button
          onClick={onUndo}
          className="
            relative
            flex-1

            rounded-[16px]
            border
            border-white/10

            bg-white/[0.04]

            py-2.5

            active:scale-[0.98]
          "
        >
          <div
            className="
              text-[10px]
              font-black
              uppercase
              tracking-[0.12em]
              text-zinc-200
            "
          >
            Undo
          </div>
        </button>

        {/* END TURN */}
        <button
          onClick={onEndTurn}
          className="
            relative
            flex-[1.4]

            overflow-hidden

            rounded-[16px]
            border
            border-cyan-300/20

            bg-gradient-to-b
            from-cyan-400/25
            to-blue-500/20

            py-2.5

            active:scale-[0.98]
          "
        >
          <div
            className="
              absolute
              inset-0
              bg-cyan-300/10
              blur-xl
            "
          />

          <div className="relative">
            <div
              className="
                text-[9px]
                uppercase
                tracking-[0.2em]
                text-cyan-100
              "
            >
              Action
            </div>

            <div
              className="
                mt-1
                text-[13px]
                font-black
                uppercase
                tracking-[0.08em]
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
