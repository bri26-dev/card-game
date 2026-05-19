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
          text-center
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
            Featured Arena
          </div>
        </div>

        {/* TITLE */}
        <div className="mt-3 sm:mt-4">
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
            text-xs
            leading-relaxed
            text-zinc-400

            sm:mt-3
            sm:text-sm
          "
        >
          Build powerful decks and dominate strategic lane battles.
        </div>

        {/* STATS */}
        <div className="mt-3 flex flex-wrap justify-center gap-2 sm:mt-4">
          {["PVP", "Strategy", "Cards"].map((item) => (
            <div
              key={item}
              className="
                rounded-full
                border
                border-white/10
                bg-white/[0.04]

                px-2.5
                py-1

                text-[9px]
                font-bold
                uppercase
                tracking-[0.12em]
                text-zinc-300

                sm:px-3
                sm:py-1.5
                sm:text-[10px]
              "
            >
              {item}
            </div>
          ))}
        </div>

        {/* VISUAL */}
        <div
          className="
            relative
            mt-4
            flex-1
            min-h-[140px]

            overflow-hidden
            rounded-[22px]

            border
            border-white/10

            bg-gradient-to-br
            from-cyan-500/10
            via-transparent
            to-violet-500/10

            sm:mt-5
            sm:min-h-[220px]
            sm:rounded-[26px]
          "
        />

        {/* BUTTON */}
        <button
          onClick={onPlay}
          className="
            group
            relative

            mt-4
            w-full
            overflow-hidden

            rounded-[18px]
            border
            border-cyan-400/30

            bg-cyan-500/20

            px-5
            py-3

            text-xs
            font-black
            uppercase
            tracking-[0.16em]
            text-cyan-100

            transition-all

            hover:scale-[1.02]
            hover:bg-cyan-500/30
            active:scale-[0.98]

            sm:mt-5
            sm:rounded-[22px]
            sm:py-4
            sm:text-sm
            sm:tracking-[0.18em]
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
