// components/sections/Header.tsx

type Props = {
  turn: number;
  energy: number;
};

export default function Header({ turn, energy }: Props) {
  return (
    <header className="px-3 pb-2 pt-3">
      <div
        className="
          relative
          overflow-hidden
          rounded-[28px]
          border
          border-white/10
          bg-gradient-to-b
          from-[#1f2947]
          via-[#121827]
          to-[#0a0d18]
          px-3
          py-3
          shadow-[0_10px_40px_rgba(0,0,0,0.45)]
        "
      >
        {/* PIXEL GRID */}
        <div
          className="
            pointer-events-none
            absolute
            inset-0
            opacity-[0.06]
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
              h-[66px]
              w-[72px]
              flex-col
              items-center
              justify-center
              rounded-[20px]
              border
              border-white/10
              bg-[#0c1120]
              shadow-inner
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
                text-[26px]
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
                text-[15px]
                font-black
                uppercase
                tracking-[0.18em]
                text-white
              "
            >
              CARD BATTLE
            </h1>

            <p
              className="
                mt-1
                text-[8px]
                uppercase
                tracking-[0.24em]
                text-blue-200/60
              "
            >
              Pixel Strategy
            </p>
          </div>

          {/* ENERGY */}
          <div
            className="
              relative
              flex
              h-[66px]
              w-[72px]
              flex-col
              items-center
              justify-center
              overflow-hidden
              rounded-[20px]
              border
              border-cyan-400/20
              bg-gradient-to-b
              from-cyan-500/20
              to-blue-500/10
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
                text-[26px]
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
