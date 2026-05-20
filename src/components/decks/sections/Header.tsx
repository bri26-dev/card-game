"use client";

import { Plus, Layers3, Sparkles, Pencil, Save } from "lucide-react";

type Props = {
  decks: any[];

  selectedDeckId: string;

  selectedDeck: any;

  totalCost: number;

  deckName: string;

  setDeckName: (value: string) => void;

  createDeck: (name: string) => void;

  selectDeck: (id: string) => void;

  editMode: boolean;

  setEditMode: (value: boolean) => void;

  canSave: boolean;
};

export default function DeckHeader({
  decks,
  selectedDeckId,
  selectedDeck,
  totalCost,
  deckName,
  setDeckName,
  createDeck,
  selectDeck,
  editMode,
  setEditMode,
  canSave,
}: Props) {
  return (
    <>
      {/* TOP */}
      <div
        className="
          sticky
          top-0
          z-40
          mb-2
          rounded-2xl
          border
          border-white/10
          bg-[#0b1018]/90
          px-2
          py-2
          backdrop-blur-2xl
        "
      >
        <div className="flex items-center gap-2">
          <div
            className="
              flex
              h-8
              w-8
              items-center
              justify-center
              rounded-xl
              bg-cyan-500/10
              text-cyan-300
            "
          >
            <Layers3 size={15} />
          </div>

          <div className="min-w-0 flex-1">
            <h1 className="truncate text-xs font-black uppercase">
              {selectedDeck?.name || "Deck"}
            </h1>

            <p className="text-[8px] text-zinc-500">
              {selectedDeck?.cards.length || 0}/12 Cards
            </p>
          </div>

          <div className="flex gap-1">
            <div
              className="
                rounded-lg
                border
                border-white/10
                bg-white/[0.04]
                px-2
                py-1
              "
            >
              <div className="text-[7px] text-zinc-500">Cost</div>

              <div className="text-[9px] font-black">{totalCost}</div>
            </div>

            <button
              onClick={() => {
                if (editMode && !canSave) return;

                setEditMode(!editMode);
              }}
              className={`
                flex
                items-center
                gap-1
                rounded-lg
                px-2
                py-1
                text-[9px]
                font-black
                uppercase

                ${
                  editMode
                    ? `
                      bg-cyan-500
                      text-black
                    `
                    : `
                      border
                      border-white/10
                      bg-white/[0.04]
                    `
                }

                ${
                  editMode && !canSave
                    ? `
                      opacity-50
                    `
                    : ``
                }
              `}
            >
              {editMode ? <Save size={10} /> : <Pencil size={10} />}

              {editMode ? "Save" : "Edit"}
            </button>
          </div>
        </div>

        {/* SAVE WARNING */}
        {editMode && !canSave && (
          <div
            className="
              mt-2
              rounded-lg
              border
              border-red-500/20
              bg-red-500/10
              px-2
              py-1
              text-[8px]
              text-red-200
            "
          >
            Deck must contain exactly 12 cards before saving.
          </div>
        )}
      </div>

      {/* DECK LIST */}
      <div className="mb-2 flex gap-1 overflow-x-auto pb-1">
        {decks.map((deck) => {
          const active = deck.id === selectedDeckId;

          return (
            <button
              key={deck.id}
              onClick={() => selectDeck(deck.id)}
              className={`
                shrink-0
                rounded-xl
                border
                px-2
                py-1.5

                ${
                  active
                    ? `
                      border-cyan-400/30
                      bg-cyan-500/10
                    `
                    : `
                      border-white/10
                      bg-white/[0.03]
                    `
                }
              `}
            >
              <div className="flex items-center gap-1">
                <div>
                  <div className="text-[9px] font-bold">{deck.name}</div>

                  <div className="text-[7px] text-zinc-500">
                    {deck.cards.length}/12
                  </div>
                </div>

                {active && <Sparkles size={9} className="text-cyan-300" />}
              </div>
            </button>
          );
        })}

        {/* CREATE */}
        <div className="flex shrink-0 gap-1">
          <input
            value={deckName}
            onChange={(e) => setDeckName(e.target.value)}
            placeholder="Deck"
            className="
              h-8
              w-[75px]
              rounded-xl
              border
              border-white/10
              bg-black/30
              px-2
              text-[9px]
              outline-none
            "
          />

          <button
            onClick={() => {
              if (!deckName.trim()) return;

              createDeck(deckName);

              setDeckName("");
            }}
            className="
              flex
              h-8
              w-8
              items-center
              justify-center
              rounded-xl
              bg-cyan-500
              text-black
            "
          >
            <Plus size={12} />
          </button>
        </div>
      </div>
    </>
  );
}
