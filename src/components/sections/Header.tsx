// components/sections/Header.tsx

type Props = {
  turn: number;

  energy: number;
};

export default function Header({ turn, energy }: Props) {
  return (
    <header className="pt-1">
      <div
        className="
          relative
          overflow-hidden

          rounded-[30px]
          border
          border-white/10

          bg-[linear-gradient(180deg,#1c2950_0%,#10182d_50%,#0b1020_100%)]

          px-4
          py-4

          shadow-[0_18px_50px_rgba(0,0,0,0.45)]
          backdrop-blur-xl
        "
      >
        {/* GLOW */}
        <div
          className="
            absolute
            inset-0
            bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.18),transparent_65%)]
          "
        />

        {/* GRID */}
        <div
          className="
            absolute
            inset-0
            opacity-[0.05]
          "
          style={{
            backgroundImage: `
              linear-gradient(to right, white 1px, transparent 1px),
              linear-gradient(to bottom, white 1px, transparent 1px)
            `,
            backgroundSize: "8px 8px",
          }}
        />

        <div className="relative flex items-center justify-between">
          {/* TURN */}
          <div
            className="
              flex
              h-[72px]
              w-[76px]
              flex-col
              items-center
              justify-center

              rounded-[22px]
              border
              border-white/10

              bg-black/25
              backdrop-blur-md
            "
          >
            <span
              className="
                text-[8px]
                uppercase
                tracking-[0.28em]
                text-zinc-400
              "
            >
              Turn
            </span>

            <span
              className="
                mt-1
                text-[28px]
                font-black
                leading-none
                text-white
              "
            >
              {turn}
            </span>
          </div>

          {/* TITLE */}
          <div className="text-center">
            <h1
              className="
                text-[16px]
                font-black
                uppercase
                tracking-[0.18em]
                text-white
              "
            >
              PIXEL DUEL
            </h1>

            <p
              className="
                mt-1
                text-[8px]
                uppercase
                tracking-[0.24em]
                text-cyan-200/70
              "
            >
              Pocket Card Arena
            </p>
          </div>

          {/* ENERGY */}
          <div
            className="
              relative
              flex
              h-[72px]
              w-[76px]
              flex-col
              items-center
              justify-center

              overflow-hidden
              rounded-[22px]
              border
              border-cyan-300/20

              bg-cyan-500/10
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

            <span
              className="
                relative
                text-[8px]
                uppercase
                tracking-[0.24em]
                text-cyan-100
              "
            >
              Energy
            </span>

            <span
              className="
                relative
                mt-1
                text-[28px]
                font-black
                leading-none
                text-white
              "
            >
              {energy}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
