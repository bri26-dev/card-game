"use client";

import { useEffect, useState } from "react";

import Board from "@/components/game/Board";

import Login from "@/components/menu/Login";
import MainMenu from "@/components/menu/MainMenu";

import DeckPage from "@/components/decks/DeckPage";
import CollectionPage from "@/components/collection/CollectionPage";

import { useAccountStore } from "@/store/accountStore";
import { useGameStore } from "@/store/gameStore";

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

  const [screen, setScreen] = useState<
    "menu" | "game" | "decks" | "collection"
  >("menu");

  useEffect(() => {
    loadAccount();
  }, [loadAccount]);

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#05070d]">
        <div className="animate-pulse text-sm uppercase tracking-[0.3em] text-zinc-500">
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
    <main className="relative h-screen overflow-hidden">
      {/* MENU */}
      {screen === "menu" && (
        <MainMenu
          account={account}
          onPlay={() => {
            initializeGame();

            setScreen("game");
          }}
          onLogout={logout}
          onDecks={() => {
            setScreen("decks");
          }}
          onCollection={() => {
            setScreen("collection");
          }}
        />
      )}

      {/* GAME */}
      {screen === "game" && (
        <Board
          onReturnToMenu={() => {
            setScreen("menu");
          }}
        />
      )}

      {/* DECKS */}
      {screen === "decks" && (
        <DeckPage
          onBattle={() => {
            setScreen("menu");
          }}
          onDecks={() => {
            setScreen("decks");
          }}
          onCollection={() => {
            setScreen("collection");
          }}
          onLogout={logout}
        />
      )}

      {/* COLLECTION */}
      {screen === "collection" && (
        <CollectionPage
          onBattle={() => {
            setScreen("menu");
          }}
          onDecks={() => {
            setScreen("decks");
          }}
          onCollection={() => {
            setScreen("collection");
          }}
          onLogout={logout}
        />
      )}
    </main>
  );
}
