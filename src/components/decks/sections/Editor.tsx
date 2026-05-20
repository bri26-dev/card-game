// components/decks/sections/Editor.tsx

"use client";

import { Trash2 } from "lucide-react";

import { starterCards } from "@/data/cards";

import GameCard from "@/components/game/GameCard";

type Props = {
  selectedDeck: any;

  editMode: boolean;

  addCardToDeck: (deckId: string, card: any) => void;

  removeCardFromDeck: (deckId: string, cardId: string) => void;
};

export default function DeckEditor({
  selectedDeck,
  editMode,
  addCardToDeck,
  removeCardFromDeck,
}: Props) {
  const emptySlots = 12 - (selectedDeck?.cards.length || 0);

  return (
    <div className="space-y-3">
      {/* DECK */}
      <section
        className="
          overflow-hidden
          rounded-3xl
          border
          border-white/10
          bg-[#0b1018]/90
          p-3
          backdrop-blur-xl
        "
      >
        {/* HEADER */}
        <div className="mb-3 flex items-center justify-between">
          <div>
            <h2 className="text-[10px] font-black uppercase tracking-[0.18em]">
              Active Deck
            </h2>

            <p className="text-[8px] text-zinc-500">12 cards required</p>
          </div>

          <div
            className={`
              rounded-full
              px-2.5
              py-1
              text-[7px]
              font-black
              uppercase

              ${
                editMode
                  ? `
                    bg-cyan-500/10
                    text-cyan-300
                  `
                  : `
                    bg-white/[0.05]
                    text-zinc-500
                  `
              }
            `}
          >
            {editMode ? "Editing" : "Locked"}
          </div>
        </div>

        {/* CARD GRID */}
        <div className="grid grid-cols-6 gap-2">
          {selectedDeck?.cards.map((card: any, index: number) => (
            <div key={`${card.id}-${index}`} className="relative">
              <GameCard card={card} compact />

              {editMode && (
                <button
                  onClick={() => removeCardFromDeck(selectedDeck.id, card.id)}
                  className="
                    absolute
                    -right-1
                    -top-1
                    z-30
                    flex
                    h-5
                    w-5
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-red-300/20
                    bg-red-500
                    shadow-lg
                  "
                >
                  <Trash2 size={8} />
                </button>
              )}
            </div>
          ))}

          {/* EMPTY */}
          {Array.from({ length: emptySlots }).map((_, index) => (
            <div
              key={index}
              className="
                flex
                h-[82px]
                w-[58px]
                items-center
                justify-center
                rounded-[18px]
                border
                border-dashed
                border-white/10
                bg-white/[0.03]
                text-[8px]
                font-bold
                uppercase
                text-zinc-600
              "
            >
              Empty
            </div>
          ))}
        </div>
      </section>

      {/* COLLECTION */}
      <section
        className="
          rounded-3xl
          border
          border-white/10
          bg-[#0b1018]/90
          p-3
          backdrop-blur-xl
        "
      >
        {/* HEADER */}
        <div className="mb-3 flex items-center justify-between">
          <div>
            <h2 className="text-[10px] font-black uppercase tracking-[0.18em]">
              Collection
            </h2>

            <p className="text-[8px] text-zinc-500">Tap to add cards</p>
          </div>

          <div className="rounded-full bg-white/[0.04] px-2 py-1 text-[7px] text-zinc-400">
            {starterCards.length} Cards
          </div>
        </div>

        {/* COLLECTION GRID */}
        <div className="grid grid-cols-5 gap-2 sm:grid-cols-6 md:grid-cols-7 lg:grid-cols-8">
          {starterCards.map((card) => {
            const alreadyInDeck = selectedDeck?.cards.some(
              (deckCard: any) => deckCard.id === card.id,
            );

            return (
              <button
                key={card.id}
                disabled={!editMode}
                onClick={() => {
                  if (!selectedDeck) return;

                  if (!editMode) return;

                  if (alreadyInDeck) return;

                  if (selectedDeck.cards.length >= 12) return;

                  addCardToDeck(selectedDeck.id, card);
                }}
                className={`
                  relative
                  transition-all

                  ${
                    alreadyInDeck
                      ? `
                        scale-[0.97]
                        opacity-40
                      `
                      : `
                        hover:-translate-y-1
                      `
                  }
                `}
              >
                <GameCard card={card} compact />

                {alreadyInDeck && (
                  <div
                    className="
                      absolute
                      inset-0
                      z-20
                      flex
                      items-center
                      justify-center
                      rounded-[18px]
                      bg-black/60
                      text-[8px]
                      font-black
                      uppercase
                      tracking-[0.15em]
                      text-cyan-200
                    "
                  >
                    Added
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </section>
    </div>
  );
}
