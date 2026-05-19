// components/menu/MainMenu.tsx

"use client";

import type { Account } from "@/engine/types/account";

import Hero from "./sections/Hero";
import Profile from "./sections/Profile";
import Navigation from "./sections/Navigation";

type Props = {
  account: Account;

  onPlay: () => void;

  onLogout: () => void;

  onDecks: () => void;

  onCollection: () => void;
};

export default function MainMenu({
  account,
  onPlay,
  onLogout,
  onDecks,
  onCollection,
}: Props) {
  return (
    <div
      className="
        relative
        min-h-screen
        overflow-hidden
        bg-[#05070d]
        text-white
      "
    >
      {/* BACKGROUND */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.10),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(168,85,247,0.10),transparent_40%)]" />

        <div
          className="
            absolute
            inset-0
            opacity-[0.04]
            [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)]
            [background-size:34px_34px]
          "
        />

        <div
          className="
            absolute
            left-[-120px]
            top-[5%]
            h-[220px]
            w-[220px]
            rounded-full
            bg-cyan-500/10
            blur-3xl
          "
        />

        <div
          className="
            absolute
            bottom-[-100px]
            right-[-80px]
            h-[220px]
            w-[220px]
            rounded-full
            bg-violet-500/10
            blur-3xl
          "
        />
      </div>

      {/* CONTENT */}
      <div
        className="
          relative
          z-10
          mx-auto
          flex
          min-h-screen
          w-full
          max-w-md
          flex-col
          gap-3

          px-3
          pb-24
          pt-3

          sm:gap-4
          sm:px-4
          sm:pb-28
          sm:pt-4
        "
      >
        <Profile account={account} />

        <div className="min-h-0 flex-1">
          <Hero onPlay={onPlay} />
        </div>
      </div>

      <Navigation
        onPlay={onPlay}
        onDecks={onDecks}
        onCollection={onCollection}
        onLogout={onLogout}
      />
    </div>
  );
}
