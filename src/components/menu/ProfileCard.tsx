import type { Account } from "@/engine/types/account";

import PixelPanel from "../ui/PixelPanel";

type Props = {
  account: Account;
};

export default function ProfileCard({ account }: Props) {
  return (
    <PixelPanel className="p-5">
      <div className="flex items-center gap-4">
        <div
          className="
            flex
            h-16
            w-16
            items-center
            justify-center
            rounded-[20px]
            border
            border-cyan-400/20
            bg-cyan-500/10
            text-2xl
            font-black
            text-cyan-100
          "
        >
          {account.username.charAt(0).toUpperCase()}
        </div>

        <div className="flex-1">
          <div className="text-xs uppercase tracking-[0.22em] text-zinc-500">
            Commander
          </div>

          <div className="mt-1 text-xl font-black text-white">
            {account.username}
          </div>

          <div className="mt-2 flex items-center gap-3 text-xs">
            <div className="rounded-full bg-white/5 px-3 py-1 text-zinc-300">
              LVL {account.level}
            </div>

            <div className="rounded-full bg-yellow-500/10 px-3 py-1 text-yellow-200">
              {account.coins} Coins
            </div>
          </div>
        </div>
      </div>
    </PixelPanel>
  );
}
