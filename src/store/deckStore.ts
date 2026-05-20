"use client";

import { create } from "zustand";

import type { Card } from "@/engine/types/types";
import type { Deck } from "@/engine/types/deck";

import { starterDecks } from "@/data/decks";

const MAX_DECK_SIZE = 12;

interface DeckStore {
  decks: Deck[];

  selectedDeckId: string;

  createDeck: (name: string) => void;

  deleteDeck: (deckId: string) => void;

  renameDeck: (deckId: string, name: string) => void;

  selectDeck: (deckId: string) => void;

  addCardToDeck: (deckId: string, card: Card) => void;

  removeCardFromDeck: (deckId: string, cardId: string) => void;

  getSelectedDeck: () => Deck | undefined;
}

export const useDeckStore = create<DeckStore>((set, get) => ({
  decks: starterDecks,

  selectedDeckId: starterDecks[0].id,

  createDeck: (name) => {
    const newDeck: Deck = {
      id: crypto.randomUUID(),

      name,

      cards: [],
    };

    set((state) => ({
      decks: [...state.decks, newDeck],
    }));
  },

  deleteDeck: (deckId) => {
    set((state) => ({
      decks: state.decks.filter((deck) => deck.id !== deckId),
    }));
  },

  renameDeck: (deckId, name) => {
    set((state) => ({
      decks: state.decks.map((deck) =>
        deck.id === deckId
          ? {
              ...deck,
              name,
            }
          : deck,
      ),
    }));
  },

  selectDeck: (deckId) => {
    set({
      selectedDeckId: deckId,
    });
  },

  addCardToDeck: (deckId, card) =>
    set((state) => ({
      decks: state.decks.map((deck) => {
        if (deck.id !== deckId) return deck;

        const alreadyExists = deck.cards.some((c) => c.id === card.id);

        if (alreadyExists) return deck;

        if (deck.cards.length >= 12) return deck;

        return {
          ...deck,
          cards: [...deck.cards, card],
        };
      }),
    })),

  removeCardFromDeck: (deckId, cardId) => {
    set((state) => ({
      decks: state.decks.map((deck) => {
        if (deck.id !== deckId) {
          return deck;
        }

        const index = deck.cards.findIndex((card) => card.id === cardId);

        if (index === -1) {
          return deck;
        }

        const updatedCards = [...deck.cards];

        updatedCards.splice(index, 1);

        return {
          ...deck,

          cards: updatedCards,
        };
      }),
    }));
  },

  getSelectedDeck: () => {
    const { decks, selectedDeckId } = get();

    return decks.find((deck) => deck.id === selectedDeckId);
  },
}));
