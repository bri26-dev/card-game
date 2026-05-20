// components/menu/sections/Hero.tsx

"use client";

import { Swords, Users } from "lucide-react";

type Props = {
  onPlay: () => void;
};

export default function Hero({ onPlay }: Props) {
  return (
    <div
      className="
        relative
        flex
        h-full
        flex-col
        overflow-hidden

        rounded-[24px]
        border
        border-white/10

        bg-[#0b1018]/90

        p-4
        sm:rounded-[32px]
        sm:p-5

        shadow-[0_20px_60px_rgba(0,0,0,0.45)]
        backdrop-blur-xl
      "
    >
      {/* BACKGROUND */}
      <div
        className="
          absolute
          inset-0
          bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.10),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(168,85,247,0.12),transparent_35%)]
        "
      />

      {/* GRID */}
      <div
        className="
          absolute
          inset-0
          opacity-[0.03]
          [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)]
          [background-size:24px_24px]
        "
      />

      {/* GLOW */}
      <div
        className="
          absolute
          left-1/2
          top-[-60px]
          h-[220px]
          w-[220px]
          -translate-x-1/2
          rounded-full
          bg-violet-500/15
          blur-3xl
        "
      />

      <div
        className="
          relative
          z-10
          flex
          h-full
          flex-col
        "
      >
        {/* TAG */}
        <div className="flex justify-center">
          <div
            className="
              rounded-full
              border
              border-cyan-400/20
              bg-cyan-500/10

              px-3
              py-1

              text-[9px]
              font-bold
              uppercase
              tracking-[0.18em]
              text-cyan-300

              sm:text-[10px]
              sm:tracking-[0.22em]
            "
          >
            Featured Modes
          </div>
        </div>

        {/* TITLE */}
        <div className="mt-3 text-center sm:mt-4">
          <div
            className="
              text-4xl
              font-black
              leading-none
              text-white

              sm:text-5xl
            "
          >
            CARD
          </div>

          <div
            className="
              bg-gradient-to-r
              from-cyan-300
              via-cyan-100
              to-violet-300
              bg-clip-text

              text-4xl
              font-black
              text-transparent

              sm:text-5xl
            "
          >
            BATTLE
          </div>
        </div>

        {/* DESC */}
        <div
          className="
            mt-2
            text-center
            text-xs
            leading-relaxed
            text-zinc-400

            sm:mt-3
            sm:text-sm
          "
        >
          Choose a mode and enter tactical lane combat.
        </div>

        {/* MODES */}
        <div className="mt-5 grid gap-3">
          {/* PVP */}
          <div
            className="
              relative
              overflow-hidden

              rounded-[24px]
              border
              border-white/10

              bg-white/[0.03]

              p-4
            "
          >
            {/* DISABLED OVERLAY */}
            <div
              className="
                absolute
                inset-0
                z-20

                flex
                items-center
                justify-center

                bg-black/60
                backdrop-blur-[2px]
              "
            >
              <div
                className="
                  rounded-full
                  border
                  border-yellow-400/20
                  bg-yellow-500/10

                  px-3
                  py-1

                  text-[10px]
                  font-black
                  uppercase
                  tracking-[0.18em]
                  text-yellow-200
                "
              >
                Coming Soon
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div
                className="
                  flex
                  h-11
                  w-11
                  items-center
                  justify-center

                  rounded-2xl
                  bg-red-500/10
                "
              >
                <Swords className="text-red-300" size={20} />
              </div>

              <div className="flex-1">
                <div
                  className="
                    text-sm
                    font-black
                    uppercase
                    tracking-[0.14em]
                    text-white
                  "
                >
                  PVP Arena
                </div>

                <div
                  className="
                    mt-1
                    text-xs
                    leading-relaxed
                    text-zinc-400
                  "
                >
                  Battle against online opponents in competitive lane combat.
                </div>
              </div>
            </div>
          </div>

          {/* COOP */}
          <button
            onClick={onPlay}
            className="
              group
              relative
              overflow-hidden

              rounded-[24px]
              border
              border-cyan-400/20

              bg-cyan-500/10

              p-4

              text-left
              transition-all

              hover:-translate-y-1
              hover:bg-cyan-500/15
              active:scale-[0.98]
            "
          >
            {/* HOVER SHINE */}
            <div
              className="
                absolute
                inset-0
                bg-gradient-to-r
                from-transparent
                via-white/10
                to-transparent
                opacity-0
                transition
                group-hover:opacity-100
              "
            />

            <div className="relative flex items-start gap-3">
              <div
                className="
                  flex
                  h-11
                  w-11
                  items-center
                  justify-center

                  rounded-2xl
                  bg-cyan-500/10
                "
              >
                <Users className="text-cyan-200" size={20} />
              </div>

              <div className="flex-1">
                <div
                  className="
                    text-sm
                    font-black
                    uppercase
                    tracking-[0.14em]
                    text-cyan-100
                  "
                >
                  Co-op Battle
                </div>

                <div
                  className="
                    mt-1
                    text-xs
                    leading-relaxed
                    text-cyan-50/70
                  "
                >
                  Team up in cooperative battles and take on enemy encounters.
                </div>
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
