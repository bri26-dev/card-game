// components/menu/MainMenu.tsx

"use client";

import type { Account } from "@/engine/types/account";

import PixelPanel from "@/components/ui/PixelPanel";

import MenuButton from "@/components/menu/MenuButton";

import ProfileCard from "@/components/menu/ProfileCard";

type Props = {
  account: Account;

  onPlay: () => void;

  onLogout: () => void;
};

export default function MainMenu({ account, onPlay, onLogout }: Props) {
  return (
    <div
      className="
        relative
        flex
        min-h-screen
        items-center
        justify-center
        overflow-hidden
        px-4
      "
    >
      {/* BACKGROUND */}
      <div className="absolute inset-0 bg-[#06080f]" />

      {/* GLOW */}
      <div
        className="
          pointer-events-none
          absolute
          left-1/2
          top-[-15%]
          h-[520px]
          w-[520px]
          -translate-x-1/2
          rounded-full
          bg-cyan-500/10
          blur-3xl
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          bottom-[-10%]
          right-[-10%]
          h-[420px]
          w-[420px]
          rounded-full
          bg-violet-500/10
          blur-3xl
        "
      />

      {/* GRID */}
      <div
        className="
          pointer-events-none
          absolute
          inset-0
          opacity-[0.05]
          [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)]
          [background-size:40px_40px]
        "
      />

      {/* CONTENT */}
      <div className="relative z-10 w-full max-w-md">
        <div className="mb-6 text-center">
          <div
            className="
              text-xs
              uppercase
              tracking-[0.4em]
              text-cyan-300
            "
          >
            Pixel Card Arena
          </div>

          <div
            className="
              mt-4
              text-5xl
              font-black
              uppercase
              tracking-[0.06em]
              text-white
            "
          >
            Card Battle
          </div>

          <div className="mt-3 text-sm text-zinc-400">
            Build your deck. Conquer the lanes.
          </div>
        </div>

        <PixelPanel className="space-y-5 p-5">
          <ProfileCard account={account} />

          <div className="space-y-3 p-4">
            <MenuButton label="Play Co-op" variant="primary" onClick={onPlay} />

            <MenuButton label="Collection" disabled />

            <MenuButton label="Settings" disabled />

            <MenuButton label="Logout" variant="danger" onClick={onLogout} />
          </div>
        </PixelPanel>
      </div>
    </div>
  );
}
