// store/accountStore.ts

import { create } from "zustand";

import type { Account } from "@/engine/types/account";

type AccountStore = {
  account: Account | null;

  loading: boolean;

  authError: string;

  authSuccess: string;

  loadAccount: () => void;

  login: (username: string, password: string) => void;

  register: (username: string, password: string) => boolean;

  logout: () => void;

  clearAuthError: () => void;

  clearAuthSuccess: () => void;
};

const ACCOUNT_KEY = "pixel_card_account";

const SESSION_KEY = "pixel_card_session";

export const useAccountStore = create<AccountStore>((set) => ({
  account: null,

  loading: true,

  authError: "",

  authSuccess: "",

  loadAccount: () => {
    if (typeof window === "undefined") return;

    const savedAccount = localStorage.getItem(ACCOUNT_KEY);

    const savedSession = localStorage.getItem(SESSION_KEY);

    if (!savedAccount || !savedSession) {
      set({ loading: false });

      return;
    }

    try {
      const parsedAccount: Account = JSON.parse(savedAccount);

      const parsedSession = JSON.parse(savedSession);

      if (parsedSession.loggedIn) {
        set({
          account: parsedAccount,
          loading: false,
        });

        return;
      }
    } catch {
      localStorage.removeItem(ACCOUNT_KEY);

      localStorage.removeItem(SESSION_KEY);
    }

    set({ loading: false });
  },

  register: (username, password) => {
    set({
      authError: "",
      authSuccess: "",
    });

    const saved = localStorage.getItem(ACCOUNT_KEY);

    if (saved) {
      const existing: Account = JSON.parse(saved);

      if (existing.username.toLowerCase() === username.toLowerCase()) {
        set({
          authError: "Username already exists.",
        });

        return false;
      }
    }

    const accountData: Account = {
      id: crypto.randomUUID(),

      username,

      password,

      level: 1,

      coins: 0,

      createdAt: Date.now(),
    };

    localStorage.setItem(ACCOUNT_KEY, JSON.stringify(accountData));

    localStorage.removeItem(SESSION_KEY);

    set({
      account: null,

      authSuccess: "Account created successfully. Please login to continue.",
    });

    return true;
  },

  login: (username, password) => {
    set({
      authError: "",
      authSuccess: "",
    });

    const saved = localStorage.getItem(ACCOUNT_KEY);

    if (!saved) {
      set({
        authError: "No registered account found.",
      });

      return;
    }

    const parsed: Account = JSON.parse(saved);

    if (parsed.username.toLowerCase() !== username.toLowerCase()) {
      set({
        authError: "Username not found.",
      });

      return;
    }

    if (parsed.password !== password) {
      set({
        authError: "Incorrect password.",
      });

      return;
    }

    localStorage.setItem(
      SESSION_KEY,
      JSON.stringify({
        loggedIn: true,
      }),
    );

    set({
      account: parsed,
    });
  },

  logout: () => {
    localStorage.removeItem(SESSION_KEY);

    set({
      account: null,

      authError: "",

      authSuccess: "",
    });
  },

  clearAuthError: () => {
    set({
      authError: "",
    });
  },

  clearAuthSuccess: () => {
    set({
      authSuccess: "",
    });
  },
}));
