// components/decks/DeckPage.tsx

"use client";

import { useMemo, useState } from "react";

import { useDeckStore } from "@/store/deckStore";

import DeckHeader from "./sections/Header";
import DeckEditor from "./sections/Editor";

import Navigation from "../menu/sections/Navigation";

type Props = {
  onBattle: () => void;

  onDecks: () => void;

  onCollection: () => void;

  onLogout: () => void;
};

export default function DeckPage({
  onBattle,
  onDecks,
  onCollection,
  onLogout,
}: Props) {
  const {
    decks,
    selectedDeckId,

    createDeck,
    selectDeck,

    addCardToDeck,
    removeCardFromDeck,

    getSelectedDeck,
  } = useDeckStore();

  const selectedDeck = getSelectedDeck();

  const [deckName, setDeckName] = useState("");

  const [editMode, setEditMode] = useState(false);

  const totalCost = useMemo(() => {
    if (!selectedDeck) return 0;

    return selectedDeck.cards.reduce((total, card) => {
      return total + card.cost;
    }, 0);
  }, [selectedDeck]);

  const canSave = selectedDeck?.cards.length === 12;

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#05070d] text-white">
      {/* BG */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.10),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(168,85,247,0.10),transparent_40%)]" />

        <div
          className="
            absolute
            inset-0
            opacity-[0.03]
            [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)]
            [background-size:20px_20px]
          "
        />
      </div>

      <div className="relative z-10 h-screen overflow-y-auto pb-28">
        <div className="mx-auto max-w-7xl p-2">
          <DeckHeader
            decks={decks}
            selectedDeckId={selectedDeckId}
            selectedDeck={selectedDeck}
            totalCost={totalCost}
            deckName={deckName}
            setDeckName={setDeckName}
            createDeck={createDeck}
            selectDeck={selectDeck}
            editMode={editMode}
            setEditMode={setEditMode}
            canSave={canSave}
          />

          <DeckEditor
            selectedDeck={selectedDeck}
            editMode={editMode}
            addCardToDeck={addCardToDeck}
            removeCardFromDeck={removeCardFromDeck}
          />
        </div>
      </div>

      <Navigation
        active="decks"
        onBattle={onBattle}
        onDecks={onDecks}
        onCollection={onCollection}
        onLogout={onLogout}
      />
    </div>
  );
}
