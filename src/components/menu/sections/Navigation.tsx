// components/menu/sections/Navigation.tsx

"use client";

import { Swords, Layers3, LibraryBig, LogOut } from "lucide-react";

type Props = {
  onBattle: () => void;

  onDecks: () => void;

  onCollection: () => void;

  onLogout: () => void;

  active?: "battle" | "decks" | "collection";
};

export default function Navigation({
  onBattle,
  onDecks,
  onCollection,
  onLogout,
  active,
}: Props) {
  const item = (isActive: boolean) => `
    relative
    flex
    flex-col
    items-center
    justify-center
    rounded-2xl
    border
    px-2
    py-2.5
    transition-all
    duration-200

    ${
      isActive
        ? `
          border-cyan-400/30
          bg-cyan-500/10
          shadow-[0_0_20px_rgba(34,211,238,0.15)]
        `
        : `
          border-white/5
          bg-white/[0.03]
        `
    }
  `;

  return (
    <div className="fixed bottom-3 left-0 right-0 z-50 px-3">
      <div className="mx-auto max-w-md">
        <div
          className="
            overflow-hidden
            rounded-[28px]
            border
            border-white/10
            bg-[#0b1018]/90
            p-1.5
            shadow-[0_10px_40px_rgba(0,0,0,0.45)]
            backdrop-blur-2xl
          "
        >
          <div className="grid grid-cols-4 gap-1.5">
            {/* BATTLE */}
            <button onClick={onBattle} className={item(active === "battle")}>
              {active === "battle" && (
                <div
                  className="
                    absolute
                    inset-x-3
                    top-1
                    h-[2px]
                    rounded-full
                    bg-cyan-300
                  "
                />
              )}

              <Swords
                size={18}
                className={
                  active === "battle" ? "text-cyan-200" : "text-zinc-400"
                }
              />

              <span
                className={`
                  mt-1
                  text-[9px]
                  font-black
                  uppercase
                  tracking-[0.12em]

                  ${active === "battle" ? "text-cyan-100" : "text-zinc-400"}
                `}
              >
                Battle
              </span>
            </button>

            {/* DECKS */}
            <button onClick={onDecks} className={item(active === "decks")}>
              {active === "decks" && (
                <div
                  className="
                    absolute
                    inset-x-3
                    top-1
                    h-[2px]
                    rounded-full
                    bg-cyan-300
                  "
                />
              )}

              <Layers3
                size={18}
                className={
                  active === "decks" ? "text-cyan-200" : "text-zinc-400"
                }
              />

              <span
                className={`
                  mt-1
                  text-[9px]
                  font-black
                  uppercase
                  tracking-[0.12em]

                  ${active === "decks" ? "text-cyan-100" : "text-zinc-400"}
                `}
              >
                Decks
              </span>
            </button>

            {/* COLLECTION */}
            <button
              onClick={onCollection}
              className={item(active === "collection")}
            >
              {active === "collection" && (
                <div
                  className="
                    absolute
                    inset-x-3
                    top-1
                    h-[2px]
                    rounded-full
                    bg-cyan-300
                  "
                />
              )}

              <LibraryBig
                size={18}
                className={
                  active === "collection" ? "text-cyan-200" : "text-zinc-400"
                }
              />

              <span
                className={`
                  mt-1
                  text-[9px]
                  font-black
                  uppercase
                  tracking-[0.12em]

                  ${active === "collection" ? "text-cyan-100" : "text-zinc-400"}
                `}
              >
                Cards
              </span>
            </button>

            {/* LOGOUT */}
            <button
              onClick={onLogout}
              className="
                flex
                flex-col
                items-center
                justify-center
                rounded-2xl
                border
                border-red-500/10
                bg-red-500/[0.06]
                px-2
                py-2.5
                transition-all
              "
            >
              <LogOut size={18} className="text-red-300" />

              <span
                className="
                  mt-1
                  text-[9px]
                  font-black
                  uppercase
                  tracking-[0.12em]
                  text-red-200
                "
              >
                Quit
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
