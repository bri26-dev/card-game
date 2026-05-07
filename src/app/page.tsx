// app/page

"use client";

import { useEffect } from "react";
import { useGameStore } from "@/store/gameStore";
import Board from "@/components/Board";

export default function Home() {
  const { initGame } = useGameStore();

  useEffect(() => {
    initGame();
  }, []);

  return <Board />;
}
