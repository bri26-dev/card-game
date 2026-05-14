// components/sections/Header.tsx

type Props = {
  turn: number;

  energy: number;
};

export default function Header({ turn, energy }: Props) {
  return (
    <header className="shrink-0">
      <div
        className="
          relative
          overflow-hidden

          rounded-[26px]
          border
          border-white/10

          bg-[#0d1426]/90

          px-3
          py-2.5

          backdrop-blur-xl

          shadow-[0_12px_40px_rgba(0,0,0,.45)]
        "
      >
        {/* LIGHT */}
        <div
          className="
            absolute
            inset-0
            bg-[linear-gradient(180deg,rgba(255,255,255,0.06),transparent)]
          "
        />

        <div className="relative flex items-center justify-between gap-2">
          {/* TURN */}
          <div
            className="
              flex
              h-[58px]
              w-[64px]
              shrink-0
              flex-col
              items-center
              justify-center

              rounded-[18px]
              border
              border-white/10

              bg-black/20
            "
          >
            <span
              className="
                text-[7px]
                uppercase
                tracking-[0.24em]
                text-zinc-400
              "
            >
              Turn
            </span>

            <span
              className="
                mt-1
                text-[22px]
                font-black
                leading-none
                text-white
              "
            >
              {turn}
            </span>
          </div>

          {/* TITLE */}
          <div className="flex-1 text-center">
            <h1
              className="
                text-[13px]
                font-black
                uppercase
                tracking-[0.16em]
                text-white
              "
            >
              PIXEL DUEL
            </h1>

            <p
              className="
                mt-1
                text-[7px]
                uppercase
                tracking-[0.2em]
                text-cyan-100/70
              "
            >
              Pocket Arena
            </p>
          </div>

          {/* ENERGY */}
          <div
            className="
              relative
              flex
              h-[58px]
              w-[64px]
              shrink-0
              flex-col
              items-center
              justify-center

              overflow-hidden
              rounded-[18px]
              border
              border-cyan-300/20

              bg-cyan-400/10
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
                text-[7px]
                uppercase
                tracking-[0.22em]
                text-cyan-100
              "
            >
              Energy
            </span>

            <span
              className="
                relative
                mt-1
                text-[22px]
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
