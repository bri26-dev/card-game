"use client";

import { useEffect, useState } from "react";

import Board from "@/components/game/Board";

import MainMenu from "@/components/menu/MainMenu";

import CreateAccountModal from "@/components/menu/Login";

import { useGameStore } from "@/store/gameStore";

import { useAccountStore } from "@/store/accountStore";

export default function Home() {
  const initializeGame = useGameStore((state) => state.initializeGame);

  const account = useAccountStore((state) => state.account);

  const loadAccount = useAccountStore((state) => state.loadAccount);

  const createAccount = useAccountStore((state) => state.createAccount);

  const logout = useAccountStore((state) => state.logout);

  const [started, setStarted] = useState(false);

  useEffect(() => {
    loadAccount();
  }, [loadAccount]);

  if (!account) {
    return (
      <CreateAccountModal onCreate={(username) => createAccount(username)} />
    );
  }

  return (
    <main
      className="
        relative
        flex
        h-screen
        flex-col
        overflow-hidden
      "
    >
      {!started ? (
        <MainMenu
          account={account}
          onPlay={() => {
            initializeGame();

            setStarted(true);
          }}
          onLogout={() => {
            logout();

            setStarted(false);
          }}
        />
      ) : (
        <Board
          onReturnToMenu={() => {
            setStarted(false);
          }}
        />
      )}
    </main>
  );
}
