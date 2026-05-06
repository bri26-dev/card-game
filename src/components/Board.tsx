"use client";

import { useState, useRef } from "react";
import { useGameStore } from "@/store/gameStore";
import Card from "./Card";
import Lane from "./Lane";
import { getLanePower, getWinner, getLaneWinner } from "@/engine/actions";

export default function Board() {
  const { state, playCard, endTurn } = useGameStore();

  const [draggingIndex, setDraggingIndex] = useState<number | null>(null);
  const [touchPos, setTouchPos] = useState({ x: 0, y: 0 });

  const laneRefs = {
    lane1: useRef<HTMLDivElement>(null),
    lane2: useRef<HTMLDivElement>(null),
    lane3: useRef<HTMLDivElement>(null),
  };

  if (!state) return null;

  const lanes = state.lanes;
  const player = state.players.player1;

  const handleDrop = () => {
    if (draggingIndex === null) return;

    const { x, y } = touchPos;

    for (const lane of lanes) {
      const rect = laneRefs[lane.id].current?.getBoundingClientRect();
      if (!rect) continue;

      const inside =
        x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom;

      if (inside) {
        playCard("player1", draggingIndex, lane.id);
        break;
      }
    }

    setDraggingIndex(null);
  };

  return (
    <div className="h-screen flex flex-col bg-gray-100 text-black">
      {/* TOP */}
      <div className="text-center py-2 border-b text-sm">
        Turn {state.turn} • Energy: {player.energy}
      </div>

      {state.phase === "end" && (
        <div className="text-center text-green-600 text-sm py-1">
          Winner: {getWinner(state)}
        </div>
      )}

      {/* 🔥 BOARD (compact center) */}
      <div className="flex justify-center items-center flex-1">
        <div className="flex gap-2">
          {lanes.map((lane) => {
            const playerCards = state.players.player1.board[lane.id];
            const enemyCards = state.players.player2.board[lane.id];

            const playerPower = getLanePower(playerCards);
            const enemyPower = getLanePower(enemyCards);
            const result = getLaneWinner(playerCards, enemyCards);

            return (
              <Lane
                key={lane.id}
                lane={lane}
                playerCards={playerCards}
                enemyCards={enemyCards}
                playerPower={playerPower}
                enemyPower={enemyPower}
                result={result}
                laneRef={laneRefs[lane.id]}
              />
            );
          })}
        </div>
      </div>

      {/* HAND */}
      <div className="flex gap-1 overflow-x-auto p-2 border-t bg-white">
        {player.hand.map((card, index) => (
          <div key={index} className="scale-90">
            <Card
              {...card}
              selected={draggingIndex === index}
              onTouchStart={() => setDraggingIndex(index)}
              onTouchMove={(e) => {
                const touch = e.touches[0];
                setTouchPos({ x: touch.clientX, y: touch.clientY });
              }}
              onTouchEnd={handleDrop}
            />
          </div>
        ))}
      </div>

      {/* BUTTONS */}
      <div className="flex gap-2 p-2 border-t bg-white">
        <button
          onClick={() => useGameStore.getState().undo()}
          className="flex-1 py-2 rounded bg-gray-300 text-sm"
        >
          Undo
        </button>

        <button
          onClick={endTurn}
          className="flex-1 py-2 rounded bg-blue-400 text-white text-sm"
        >
          End Turn
        </button>
      </div>

      {/* DRAG PREVIEW */}
      {draggingIndex !== null && (
        <div
          className="fixed pointer-events-none"
          style={{
            left: touchPos.x - 25,
            top: touchPos.y - 40,
            transform: "scale(0.8)",
          }}
        >
          <Card {...player.hand[draggingIndex]} />
        </div>
      )}
    </div>
  );
}
