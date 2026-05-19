// app/page.tsx

"use client";

import { useEffect, useState } from "react";

import Board from "@/components/game/Board";
import Login from "@/components/menu/Login";
import MainMenu from "@/components/menu/MainMenu";

import { useAccountStore } from "@/store/accountStore";
import { useGameStore } from "@/store/gameStore";

import LoadingScreen from "@/components/ui/LoadingScreen";

export default function Home() {
  const initializeGame = useGameStore((state) => state.initializeGame);

  const {
    account,
    loading,
    authError,
    authSuccess,
    loadAccount,
    login,
    register,
    logout,
    clearAuthError,
    clearAuthSuccess,
  } = useAccountStore();

  const [started, setStarted] = useState(false);

  useEffect(() => {
    loadAccount();
  }, [loadAccount]);

  if (loading) {
    return (
      <main
        className="
        flex
        min-h-screen
        items-center
        justify-center
        bg-[#05070d]
      "
      >
        <div
          className="
          animate-pulse
          text-sm
          font-medium
          uppercase
          tracking-[0.3em]
          text-zinc-500
        "
        >
          Loading...
        </div>
      </main>
    );
  }

  if (!account) {
    return (
      <Login
        onLogin={login}
        onRegister={register}
        authError={authError}
        authSuccess={authSuccess}
        clearAuthError={clearAuthError}
        clearAuthSuccess={clearAuthSuccess}
      />
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
          onLogout={logout}
          onDecks={() => {
            alert("Deck Builder Coming Soon");
          }}
          onCollection={() => {
            alert("Collection Coming Soon");
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
