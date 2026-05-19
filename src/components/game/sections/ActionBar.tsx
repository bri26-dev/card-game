// components/sections/ActionBar.tsx

import type { TurnPhase } from "@/engine/types/types";

type Props = {
  currentPhase: TurnPhase;

  canUndo: boolean;

  onUndo: () => void;

  onSurrender: () => void;

  onEndTurn: () => void;

  onRestart: () => void;

  onReturnToMenu?: () => void;
};

export default function ActionBar({
  currentPhase,
  canUndo,
  onUndo,
  onSurrender,
  onEndTurn,
  onRestart,
  onReturnToMenu,
}: Props) {
  if (currentPhase === "end") {
    return (
      <footer className="shrink-0 h-[88px]">
        <div className="flex gap-2 p-2">
          {/* MENU */}

          <button
            onClick={onReturnToMenu}
            className="
              flex-1
              rounded-[18px]
              border
              border-white/10
              bg-white/[0.04]
              py-3
              active:scale-[0.98]
            "
          >
            <div
              className="
                text-[9px]
                uppercase
                tracking-[0.2em]
                text-zinc-300
              "
            >
              Exit Match
            </div>

            <div
              className="
                text-base
                font-black
                uppercase
                text-white
              "
            >
              Main Menu
            </div>
          </button>

          {/* AGAIN */}

          <button
            onClick={onRestart}
            className="
              relative
              flex-[1.2]
              overflow-hidden
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
                absolute
                inset-0
                bg-emerald-300/10
                blur-xl
              "
            />

            <div className="relative">
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
                  text-base
                  font-black
                  uppercase
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
    <footer className="shrink-0 h-[88px]">
      <div
        className="
          relative
          flex
          gap-2
          p-2
        "
      >
        {/* LEFT BUTTON */}

        <button
          onClick={canUndo ? onUndo : onSurrender}
          className={`
            relative
            flex-1
            rounded-[16px]
            py-2.5
            active:scale-[0.98]
            border

            ${
              canUndo
                ? `
                  border-white/10
                  bg-white/[0.04]
                `
                : `
                  border-red-400/20
                  bg-red-500/15
                `
            }
          `}
        >
          <div
            className="
              text-[10px]
              font-black
              uppercase
              tracking-[0.12em]
              text-white
            "
          >
            {canUndo ? "Undo" : "Surrender"}
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
                text-[13px]
                font-black
                uppercase
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
