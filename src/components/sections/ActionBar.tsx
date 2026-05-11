// components/game/sections/ActionBar.tsx

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
  /**
   * END GAME
   */
  if (currentPhase === "end") {
    return (
      <footer className="border-t bg-white/95 p-3 shadow-[0_-4px_20px_rgba(0,0,0,0.06)] backdrop-blur">
        <button
          onClick={onRestart}
          className="
            w-full
            rounded-2xl
            bg-emerald-500
            py-4
            text-white
            shadow-lg
            shadow-emerald-300/50
            transition
            active:scale-[0.98]
          "
        >
          <div className="text-xs uppercase tracking-wide opacity-80">
            Match Finished
          </div>

          <div className="text-base font-black">Play Again</div>
        </button>
      </footer>
    );
  }

  return (
    <footer className="border-t bg-white/95 p-3 shadow-[0_-4px_20px_rgba(0,0,0,0.06)] backdrop-blur">
      <div className="flex gap-3">
        <button
          onClick={onUndo}
          className="
            flex-1
            rounded-2xl
            bg-zinc-200
            py-3
            shadow-sm
            transition
            active:scale-[0.98]
          "
        >
          <div className="text-xs font-semibold text-zinc-700">Undo</div>
        </button>

        <button
          onClick={onEndTurn}
          className="
            flex-[1.5]
            rounded-2xl
            bg-blue-500
            py-3
            text-white
            shadow-lg
            shadow-blue-300/50
            transition
            active:scale-[0.98]
          "
        >
          <div className="text-xs uppercase tracking-wide opacity-80">
            Action
          </div>

          <div className="text-sm font-black">End Turn</div>
        </button>
      </div>
    </footer>
  );
}
