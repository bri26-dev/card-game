// app/page

"use client";

import { useEffect } from "react";
import { useGameStore } from "@/store/gameStore";
import Board from "@/components/game/Board";

export default function Home() {
  const { initializeGame } = useGameStore();

  useEffect(() => {
    initializeGame();
  }, []);

  return <Board />;
}
