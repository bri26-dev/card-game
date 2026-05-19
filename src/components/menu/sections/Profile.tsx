// components/menu/sections/Profile.tsx

"use client";

import type { Account } from "@/engine/types/account";

type Props = {
  account: Account;
};

export default function Profile({ account }: Props) {
  return (
    <div
      className="
        group
        relative
        overflow-hidden
        rounded-[30px]
        border
        border-white/10
        bg-[#0b1018]/90
        p-4
        shadow-[0_18px_50px_rgba(0,0,0,0.45)]
        backdrop-blur-xl
      "
    >
      {/* BACKGROUND GRADIENT */}
      <div
        className="
          absolute
          inset-0
          bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,0.14),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(168,85,247,0.12),transparent_40%)]
        "
      />

      {/* GRID OVERLAY */}
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
          right-[-40px]
          top-[-40px]
          h-[140px]
          w-[140px]
          rounded-full
          bg-cyan-400/10
          blur-3xl
        "
      />

      <div
        className="
          relative
          z-10
          flex
          items-center
          gap-4
        "
      >
        {/* AVATAR */}
        <div className="relative shrink-0">
          {/* OUTER GLOW */}
          <div
            className="
              absolute
              inset-0
              rounded-[22px]
              bg-cyan-400/20
              blur-xl
            "
          />

          <div
            className="
              relative
              flex
              h-16
              w-16
              items-center
              justify-center
              rounded-[22px]
              border
              border-cyan-400/25
              bg-gradient-to-br
              from-cyan-400/20
              to-cyan-500/5
              text-2xl
              font-black
              text-cyan-100
              shadow-[0_0_25px_rgba(34,211,238,0.12)]
            "
          >
            {account.username.charAt(0).toUpperCase()}
          </div>
        </div>

        {/* USER INFO */}
        <div className="min-w-0 flex-1">
          {/* USERNAME */}
          <div
            className="
              truncate
              text-lg
              font-black
              tracking-wide
              text-white
            "
          >
            {account.username}
          </div>

          {/* SUBTEXT */}
          <div className="mt-1 text-xs uppercase tracking-[0.18em] text-zinc-500">
            Arena Commander
          </div>

          {/* STATS */}
          <div className="mt-3 flex flex-wrap items-center gap-2">
            {/* LEVEL */}
            <div
              className="
                flex
                items-center
                gap-1.5
                rounded-full
                border
                border-white/10
                bg-white/[0.05]
                px-3
                py-1.5
                text-[10px]
                font-bold
                uppercase
                tracking-[0.14em]
                text-zinc-300
              "
            >
              <div className="h-2 w-2 rounded-full bg-cyan-400" />
              Lv. {account.level}
            </div>

            {/* COINS */}
            <div
              className="
                flex
                items-center
                gap-1.5
                rounded-full
                border
                border-yellow-500/15
                bg-yellow-500/10
                px-3
                py-1.5
                text-[10px]
                font-bold
                uppercase
                tracking-[0.14em]
                text-yellow-100
              "
            >
              <div className="h-2 w-2 rounded-full bg-yellow-300" />
              {account.coins} Coins
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
