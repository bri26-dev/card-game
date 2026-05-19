// components/menu/sections/Navigation.tsx

"use client";

import { Play, Layers3, LibraryBig, LogOut } from "lucide-react";

type Props = {
  onPlay: () => void;

  onDecks: () => void;

  onCollection: () => void;

  onLogout: () => void;
};

export default function Navigation({
  onPlay,
  onDecks,
  onCollection,
  onLogout,
}: Props) {
  return (
    <div
      className="
        fixed
        bottom-4
        left-0
        right-0
        z-40
        px-4
      "
    >
      <div className="relative mx-auto max-w-lg">
        {/* AMBIENT GLOW */}
        <div
          className="
            absolute
            inset-x-16
            bottom-0
            h-20
            rounded-full
            bg-cyan-500/10
            blur-3xl
          "
        />

        <div
          className="
            relative
            overflow-hidden
            rounded-[32px]
            border
            border-white/10
            bg-[#0b1018]/90
            p-2
            shadow-[0_15px_60px_rgba(0,0,0,0.5)]
            backdrop-blur-2xl
          "
        >
          {/* TOP SHINE */}
          <div
            className="
              absolute
              inset-x-0
              top-0
              h-px
              bg-gradient-to-r
              from-transparent
              via-cyan-400/50
              to-transparent
            "
          />

          <div className="grid grid-cols-4 gap-2">
            {/* PLAY */}
            <button
              onClick={onPlay}
              className="
                group
                relative
                overflow-hidden
                rounded-[24px]
                bg-gradient-to-b
                from-cyan-400/25
                to-cyan-500/10
                px-3
                py-3
                transition-all
                hover:-translate-y-1
                hover:scale-[1.03]
              "
            >
              <div
                className="
                  absolute
                  inset-0
                  bg-cyan-400/10
                  opacity-0
                  transition-all
                  group-hover:opacity-100
                "
              />

              <div className="relative flex flex-col items-center">
                <Play size={20} className="text-cyan-200" fill="currentColor" />

                <span
                  className="
                    mt-1
                    text-[10px]
                    font-black
                    uppercase
                    tracking-[0.14em]
                    text-cyan-100
                  "
                >
                  Play
                </span>
              </div>
            </button>

            {/* DECKS */}
            <button
              onClick={onDecks}
              className="
                group
                rounded-[24px]
                border
                border-white/8
                bg-white/[0.03]
                px-3
                py-3
                transition-all
                hover:-translate-y-1
                hover:bg-white/[0.06]
              "
            >
              <div className="flex flex-col items-center">
                <Layers3
                  size={20}
                  className="
                    text-zinc-300
                    transition-all
                    group-hover:text-white
                  "
                />

                <span
                  className="
                    mt-1
                    text-[10px]
                    font-black
                    uppercase
                    tracking-[0.14em]
                    text-zinc-300
                  "
                >
                  Decks
                </span>
              </div>
            </button>

            {/* COLLECTION */}
            <button
              onClick={onCollection}
              className="
                group
                rounded-[24px]
                border
                border-white/8
                bg-white/[0.03]
                px-3
                py-3
                transition-all
                hover:-translate-y-1
                hover:bg-white/[0.06]
              "
            >
              <div className="flex flex-col items-center">
                <LibraryBig
                  size={20}
                  className="
                    text-zinc-300
                    transition-all
                    group-hover:text-white
                  "
                />

                <span
                  className="
                    mt-1
                    text-[10px]
                    font-black
                    uppercase
                    tracking-[0.14em]
                    text-zinc-300
                  "
                >
                  Cards
                </span>
              </div>
            </button>

            {/* QUIT */}
            <button
              onClick={onLogout}
              className="
                group
                rounded-[24px]
                border
                border-red-500/10
                bg-red-500/[0.08]
                px-3
                py-3
                transition-all
                hover:-translate-y-1
                hover:bg-red-500/[0.15]
              "
            >
              <div className="flex flex-col items-center">
                <LogOut
                  size={20}
                  className="
                    text-red-300
                    transition-all
                    group-hover:text-red-200
                  "
                />

                <span
                  className="
                    mt-1
                    text-[10px]
                    font-black
                    uppercase
                    tracking-[0.14em]
                    text-red-200
                  "
                >
                  Quit
                </span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
