// store/accountStore.ts

import { create } from "zustand";

import type { Account } from "../engine/types/account";

type AccountStore = {
  account: Account | null;

  loadAccount: () => void;

  createAccount: (username: string) => void;

  logout: () => void;
};

const STORAGE_KEY = "pixel_card_game_account";

export const useAccountStore = create<AccountStore>((set) => ({
  account: null,

  loadAccount: () => {
    if (typeof window === "undefined") return;

    const saved = localStorage.getItem(STORAGE_KEY);

    if (!saved) return;

    set({
      account: JSON.parse(saved),
    });
  },

  createAccount: (username: string) => {
    const account: Account = {
      id: crypto.randomUUID(),

      username,

      level: 1,

      coins: 100,

      createdAt: Date.now(),
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(account));

    set({ account });
  },

  logout: () => {
    localStorage.removeItem(STORAGE_KEY);

    set({ account: null });
  },
}));
