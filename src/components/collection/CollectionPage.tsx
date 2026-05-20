// components/collection/CollectionPage.tsx

"use client";

import Navigation from "@/components/menu/sections/Navigation";

type Props = {
  onBattle: () => void;

  onDecks: () => void;

  onCollection: () => void;

  onLogout: () => void;
};

export default function CollectionPage({
  onBattle,
  onDecks,
  onCollection,
  onLogout,
}: Props) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#05070d] text-white">
      {/* BG */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.10),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(168,85,247,0.10),transparent_40%)]" />

        <div
          className="
            absolute
            inset-0
            opacity-[0.04]
            [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)]
            [background-size:28px_28px]
          "
        />
      </div>

      {/* CONTENT */}
      <div
        className="
          relative
          z-10
          flex
          min-h-screen
          flex-col
          items-center
          justify-center
          px-6
          pb-28
          text-center
        "
      >
        <div
          className="
            rounded-3xl
            border
            border-white/10
            bg-[#0b1018]/90
            px-8
            py-10
            backdrop-blur-xl
          "
        >
          <div
            className="
              mb-4
              text-[11px]
              font-black
              uppercase
              tracking-[0.35em]
              text-cyan-300
            "
          >
            Collection
          </div>

          <h1
            className="
              text-3xl
              font-black
              uppercase
              tracking-[0.15em]
            "
          >
            Coming Soon
          </h1>

          <p className="mt-3 max-w-[260px] text-sm text-zinc-400">
            Card collection management and filters are still being developed.
          </p>
        </div>
      </div>

      {/* NAV */}
      <Navigation
        active="collection"
        onBattle={onBattle}
        onDecks={onDecks}
        onCollection={onCollection}
        onLogout={onLogout}
      />
    </div>
  );
}
