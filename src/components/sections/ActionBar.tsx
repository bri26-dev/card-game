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
      <footer
        className="
          sticky
          bottom-0
          z-40
          shrink-0

          px-2
          pb-[max(12px,env(safe-area-inset-bottom))]
          pt-2
        "
      >
        <div
          className="
            overflow-hidden
            rounded-[28px]
            border
            border-white/10
            bg-[linear-gradient(180deg,#1b2446_0%,#10182d_100%)]

            p-3

            shadow-[0_16px_40px_rgba(0,0,0,.45)]
            backdrop-blur-xl
          "
        >
          <button
            onClick={onRestart}
            className="
              relative
              w-full
              overflow-hidden

              rounded-[22px]
              border
              border-emerald-300/20

              bg-[linear-gradient(180deg,rgba(16,185,129,.35)_0%,rgba(5,150,105,.18)_100%)]

              py-4
            "
          >
            <div
              className="
                absolute
                inset-0
                bg-emerald-300/10
                blur-2xl
              "
            />

            <div className="relative">
              <div
                className="
                  text-[10px]
                  uppercase
                  tracking-[0.24em]
                  text-emerald-100
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
            </div>
          </button>
        </div>
      </footer>
    );
  }

  return (
    <footer
      className="
        sticky
        bottom-0
        z-40
        shrink-0

        px-2
        pb-[max(12px,env(safe-area-inset-bottom))]
        pt-2
      "
    >
      <div
        className="
          relative
          flex
          gap-3

          overflow-hidden
          rounded-[28px]
          border
          border-white/10

          bg-[linear-gradient(180deg,#1b2446_0%,#10182d_100%)]

          p-3

          shadow-[0_16px_40px_rgba(0,0,0,.45)]
          backdrop-blur-xl
        "
      >
        {/* GLOW */}
        <div
          className="
            absolute
            inset-x-0
            top-[-40px]
            mx-auto
            h-[100px]
            w-[180px]
            rounded-full
            bg-cyan-300/10
            blur-3xl
          "
        />

        {/* UNDO */}
        <button
          onClick={onUndo}
          className="
            relative
            flex-1

            rounded-[20px]
            border
            border-white/10

            bg-white/[0.04]

            py-3
          "
        >
          <div
            className="
              text-xs
              font-black
              uppercase
              tracking-[0.16em]
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

            rounded-[20px]
            border
            border-cyan-300/20

            bg-[linear-gradient(180deg,rgba(34,211,238,.34)_0%,rgba(37,99,235,.18)_100%)]

            py-3
          "
        >
          <div
            className="
              absolute
              inset-0
              bg-cyan-300/10
              blur-2xl
            "
          />

          <div className="relative">
            <div
              className="
                text-[10px]
                uppercase
                tracking-[0.25em]
                text-cyan-100
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
