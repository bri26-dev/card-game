// components/game/sections/BoardHeader.tsx

type Props = {
  turn: number;
  energy: number;
};

export default function Header({ turn, energy }: Props) {
  return (
    <header className="border-b bg-white/90 px-4 py-3 shadow-sm backdrop-blur">
      <div className="flex items-center justify-between">
        <div className="rounded-2xl bg-zinc-900 px-4 py-2 text-white shadow">
          <div className="text-[10px] uppercase tracking-widest opacity-70">
            Turn
          </div>

          <div className="text-center text-xl font-black leading-none">
            {turn}
          </div>
        </div>

        <div className="text-center">
          <div className="text-sm font-bold text-zinc-800">Card Battle</div>
        </div>

        <div className="rounded-2xl bg-sky-500 px-4 py-2 text-white shadow">
          <div className="text-[10px] uppercase tracking-widest opacity-80">
            Energy
          </div>

          <div className="text-center text-xl font-black leading-none">
            {energy}
          </div>
        </div>
      </div>
    </header>
  );
}
