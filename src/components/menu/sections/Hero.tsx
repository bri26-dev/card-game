// components/menu/sections/Hero.tsx

"use client";

type Props = {
  onPlay: () => void;
};

export default function Hero({ onPlay }: Props) {
  return (
    <div
      className="
        relative
        overflow-hidden
        rounded-[32px]
        border
        border-white/10
        bg-[#0b1018]/90
        p-5
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

      {/* TOP GLOW */}
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

      <div className="relative z-10 text-center">
        {/* MINI TAG */}
        <div className="flex justify-center">
          <div
            className="
              rounded-full
              border
              border-cyan-400/20
              bg-cyan-500/10
              px-3
              py-1
              text-[10px]
              font-bold
              uppercase
              tracking-[0.22em]
              text-cyan-300
            "
          >
            Featured Arena
          </div>
        </div>

        {/* TITLE */}
        <div className="mt-4">
          <div className="text-5xl font-black leading-none text-white">
            CARD
          </div>

          <div
            className="
              bg-gradient-to-r
              from-cyan-300
              via-cyan-100
              to-violet-300
              bg-clip-text
              text-5xl
              font-black
              text-transparent
            "
          >
            BATTLE
          </div>
        </div>

        <div className="mt-3 text-sm leading-relaxed text-zinc-400">
          Build powerful decks and dominate strategic lane battles.
        </div>

        {/* STATS */}
        <div className="mt-4 flex justify-center gap-2">
          <div
            className="
              rounded-full
              border
              border-white/10
              bg-white/[0.04]
              px-3
              py-1.5
              text-[10px]
              font-bold
              uppercase
              tracking-[0.14em]
              text-zinc-300
            "
          >
            PVP
          </div>

          <div
            className="
              rounded-full
              border
              border-white/10
              bg-white/[0.04]
              px-3
              py-1.5
              text-[10px]
              font-bold
              uppercase
              tracking-[0.14em]
              text-zinc-300
            "
          >
            Strategy
          </div>

          <div
            className="
              rounded-full
              border
              border-white/10
              bg-white/[0.04]
              px-3
              py-1.5
              text-[10px]
              font-bold
              uppercase
              tracking-[0.14em]
              text-zinc-300
            "
          >
            Cards
          </div>
        </div>

        {/* HERO VISUAL */}
        <div
          className="
            relative
            mt-5
            h-[250px]
            overflow-hidden
            rounded-[26px]
            border
            border-white/10
            bg-gradient-to-br
            from-cyan-500/10
            via-transparent
            to-violet-500/10
          "
        ></div>

        {/* BUTTON */}
        <button
          onClick={onPlay}
          className="
            group
            relative
            mt-5
            w-full
            overflow-hidden
            rounded-[22px]
            border
            border-cyan-400/30
            bg-cyan-500/20
            px-5
            py-4
            text-sm
            font-black
            uppercase
            tracking-[0.18em]
            text-cyan-100
            transition-all
            hover:scale-[1.02]
            hover:bg-cyan-500/30
            active:scale-[0.98]
          "
        >
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

          <span className="relative">Enter Battle</span>
        </button>
      </div>
    </div>
  );
}
