// components/Board.tsx

"use client";

import { useState, useRef } from "react";
import { useGameStore } from "@/store/gameStore";
import Card from "./Card";
import CardModal from "./CardModal";
import Lane from "./Lane";
import { getLanePower, getWinner, getLaneWinner } from "@/engine/actions";

export default function Board() {
  const { state, playCard, endTurn, restartGame } = useGameStore();

  const [draggingIndex, setDraggingIndex] = useState<number | null>(null);
  const [selectedCard, setSelectedCard] = useState<any>(null);
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
                onCardClick={setSelectedCard}
              />
            );
          })}
        </div>
      </div>

      {/* HAND */}
      <div className="flex gap-1 overflow-x-auto p-2 border-t bg-white">
        {player.hand.map((card, index) => {
          let holdTimer: ReturnType<typeof setTimeout>;

          let isDragging = false;

          let startX = 0;
          let startY = 0;

          return (
            <div
              key={index}
              className={`
          scale-90 transition-transform
          ${draggingIndex === index ? "scale-105 opacity-70" : ""}
        `}
            >
              <Card
                {...card}
                onTouchStart={(e) => {
                  const touch = e.touches[0];

                  startX = touch.clientX;
                  startY = touch.clientY;

                  setTouchPos({
                    x: touch.clientX,
                    y: touch.clientY,
                  });

                  // HOLD activates drag mode
                  holdTimer = setTimeout(() => {
                    isDragging = true;

                    setDraggingIndex(index);
                  }, 200);
                }}
                onTouchMove={(e) => {
                  const touch = e.touches[0];

                  setTouchPos({
                    x: touch.clientX,
                    y: touch.clientY,
                  });

                  // if finger moved too much BEFORE hold
                  // cancel drag activation
                  const moveX = Math.abs(touch.clientX - startX);
                  const moveY = Math.abs(touch.clientY - startY);

                  if (!isDragging && (moveX > 10 || moveY > 10)) {
                    clearTimeout(holdTimer);
                  }
                }}
                onTouchEnd={() => {
                  clearTimeout(holdTimer);

                  // =====================
                  // TAP = VIEW CARD
                  // =====================
                  if (!isDragging) {
                    setSelectedCard(card);

                    setDraggingIndex(null);

                    return;
                  }

                  // =====================
                  // DRAG DROP = PLAY CARD
                  // =====================
                  let dropped = false;

                  for (const lane of lanes) {
                    const rect =
                      laneRefs[lane.id].current?.getBoundingClientRect();

                    if (!rect) continue;

                    const inside =
                      touchPos.x >= rect.left &&
                      touchPos.x <= rect.right &&
                      touchPos.y >= rect.top &&
                      touchPos.y <= rect.bottom;

                    if (inside) {
                      playCard("player1", index, lane.id);

                      dropped = true;

                      break;
                    }
                  }

                  // optional cancel feedback
                  if (!dropped) {
                    console.log("Cancelled play");
                  }

                  setDraggingIndex(null);
                }}
              />
            </div>
          );
        })}
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

      {state.phase === "postResolve" && (
        <button
          onClick={() => {
            state.phase = "end";

            useGameStore.setState({
              state: { ...state },
            });
          }}
          className="flex-1 py-2 rounded bg-green-500 text-white text-sm"
        >
          Continue
        </button>
      )}

      {/* GAME END OVERLAY */}
      {state.phase === "end" && (
        <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-50">
          <div className="bg-white/95 backdrop-blur-sm rounded-xl p-6 flex flex-col items-center shadow-xl pointer-events-auto">
            <div className="text-xl font-bold mb-2">Game Over</div>

            <div className="text-sm text-gray-600 mb-4">
              {getWinner(state) === "draw"
                ? "It's a Draw!"
                : getWinner(state) === "player1"
                  ? "You Win!"
                  : "You Lose!"}
            </div>

            <button
              onClick={restartGame}
              className="px-5 py-2 rounded-lg bg-blue-500 text-white text-sm font-semibold active:scale-95 transition"
            >
              Play Again
            </button>
          </div>
        </div>
      )}
      {selectedCard && (
        <CardModal card={selectedCard} onClose={() => setSelectedCard(null)} />
      )}
    </div>
  );
}
