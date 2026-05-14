"use client";

import { useEffect } from "react";

import Board from "@/components/game/Board";

import { useGameStore } from "@/store/gameStore";

export default function Home() {
  const { initializeGame } = useGameStore();

  useEffect(() => {
    initializeGame();
  }, []);

  return (
    <main className="relative flex h-screen flex-col overflow-hidden">
      <Board />
    </main>
  );
}
