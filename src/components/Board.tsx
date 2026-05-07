// components/Board.tsx

"use client";

import { useState, useRef } from "react";
import { useGameStore } from "@/store/gameStore";
import Card from "./Card";
import CardModal from "./CardModal";
import Lane from "./Lane";
import LaneModal from "./LaneModal";
import { getLanePower, getWinner, getLaneWinner } from "@/engine/actions";
import { getEffectText } from "@/engine/laneEffects";

export default function Board() {
  const { state, playCard, endTurn, restartGame } = useGameStore();

  const [draggingCard, setDraggingCard] = useState<any>(null);

  const [draggingIndex, setDraggingIndex] = useState<number | null>(null);

  const [selectedCard, setSelectedCard] = useState<any>(null);
  const [selectedLane, setSelectedLane] = useState<any>(null);

  const [isDragging, setIsDragging] = useState(false);
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
      {/* TOP HUD */}
      <div
        className="
    px-4 py-3
    border-b
    bg-white/90 backdrop-blur
    shadow-sm
  "
      >
        <div className="flex items-center justify-between">
          {/* TURN */}
          <div
            className="
        px-4 py-2
        rounded-2xl
        bg-zinc-900
        text-white
        shadow
      "
          >
            <div className="text-[10px] uppercase tracking-widest opacity-70">
              Turn
            </div>

            <div className="text-xl text-center font-black leading-none">
              {state.turn}
            </div>
          </div>

          {/* TITLE */}
          <div className="text-center">
            <div className="text-xs uppercase tracking-[0.25em] text-zinc-400">
              Prototype Match
            </div>

            <div className="text-sm font-bold text-zinc-800">Card Battle</div>
          </div>

          {/* ENERGY */}
          <div
            className="
        px-4 py-2
        rounded-2xl
        bg-sky-500
        text-white
        shadow
      "
          >
            <div className="text-[10px] uppercase tracking-widest opacity-80">
              Energy
            </div>

            <div className="text-xl text-center font-black leading-none">
              {player.energy}
            </div>
          </div>
        </div>
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
                onLaneClick={(lane) => {
                  // HIDDEN LOCATION
                  if (!lane.revealed) {
                    setSelectedLane({
                      name: "Hidden Location",
                      description:
                        lane.id === "lane1"
                          ? "This location will be revealed next turn."
                          : lane.id === "lane2"
                            ? "This location will be revealed on Turn 2."
                            : "This location will be revealed on Turn 3.",
                    });

                    return;
                  }

                  // REVEALED LOCATION
                  setSelectedLane({
                    name: lane.name,
                    description: getEffectText(lane.effect),
                  });
                }}
              />
            );
          })}
        </div>
      </div>

      {/* HAND AREA */}
      <div className="relative h-30 border-t bg-white overflow-hidden">
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-end">
          {player.hand.map((card, index) => {
            const total = player.hand.length;

            // curve math
            const spread = 32;
            const offset = (index - (total - 1) / 2) * spread;

            const rotate = (index - (total - 1) / 2) * 6;

            const lift = Math.abs(index - (total - 1) / 2) * -2;

            return (
              <div
                key={index}
                className="relative transition-all duration-150"
                style={{
                  transform: `
              translateX(${offset}px)
              translateY(${lift}px)
              rotate(${rotate}deg)
            `,
                  marginLeft: index === 0 ? 0 : -28,
                  zIndex: index,
                }}
              >
                {/* VIEW BUTTON */}
                <button
                  onClick={() => setSelectedCard(card)}
                  className="
    absolute
    bottom-[-8px]
    left-1/2
    -translate-x-1/2
    z-20
    w-5
    h-5
    rounded-full
    bg-black/80
    text-white
    text-[10px]
    flex
    items-center
    justify-center
    shadow
  "
                >
                  👁
                </button>

                {/* CARD */}
                <div
                  className={`
              transition-all duration-150
              ${draggingIndex === index ? "opacity-0" : ""}
            `}
                >
                  <Card
                    {...card}
                    onTouchStart={(e) => {
                      const touch = e.touches[0];

                      const startX = touch.clientX;
                      const startY = touch.clientY;

                      (e.currentTarget as any).startX = startX;
                      (e.currentTarget as any).startY = startY;

                      setTouchPos({
                        x: startX,
                        y: startY,
                      });
                    }}
                    onTouchMove={(e) => {
                      const touch = e.touches[0];

                      const startX = (e.currentTarget as any).startX;
                      const startY = (e.currentTarget as any).startY;

                      const dx = Math.abs(touch.clientX - startX);
                      const dy = Math.abs(touch.clientY - startY);

                      // START DRAG
                      if (dx > 10 || dy > 10) {
                        if (!isDragging) {
                          setDraggingIndex(index);
                          setDraggingCard(card);
                          setIsDragging(true);
                        }
                      }

                      setTouchPos({
                        x: touch.clientX,
                        y: touch.clientY,
                      });
                    }}
                    onTouchEnd={() => {
                      // DROP
                      if (isDragging) {
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
                            break;
                          }
                        }
                      }

                      // RESET
                      setDraggingIndex(null);
                      setDraggingCard(null);
                      setIsDragging(false);
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ACTION BAR */}
      <div
        className="
    p-3
    border-t
    bg-white/95 backdrop-blur
    shadow-[0_-4px_20px_rgba(0,0,0,0.06)]
  "
      >
        <div className="flex gap-3">
          {/* UNDO */}
          <button
            onClick={() => useGameStore.getState().undo()}
            className="
        flex-1
        py-3
        rounded-2xl
        bg-zinc-200
        active:scale-[0.98]
        transition
        shadow-sm
      "
          >
            <div className="text-xs font-semibold text-zinc-700">Undo</div>
          </button>

          {/* END TURN */}
          <button
            onClick={endTurn}
            className="
        flex-[1.5]
        py-3
        rounded-2xl
        bg-blue-500
        text-white
        active:scale-[0.98]
        transition
        shadow-lg shadow-blue-300/50
      "
          >
            <div className="text-xs uppercase tracking-wide opacity-80">
              Action
            </div>

            <div className="text-sm font-black">End Turn</div>
          </button>

          {/* CONTINUE */}
          {state.phase === "postResolve" && (
            <button
              onClick={() => {
                state.phase = "end";

                useGameStore.setState({
                  state: { ...state },
                });
              }}
              className="
          flex-1
          py-3
          rounded-2xl
          bg-green-500
          text-white
          active:scale-[0.98]
          transition
          shadow-lg shadow-green-300/40
        "
            >
              <div className="text-xs font-black">Continue</div>
            </button>
          )}
        </div>
      </div>

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

      {/* DRAG PREVIEW */}
      {draggingCard && (
        <div
          className="
      fixed z-[100]
      pointer-events-none
      scale-[1.15]
drop-shadow-2xl
      will-change-transform
    "
          style={{
            left: touchPos.x - 32,
            top: touchPos.y - 48,
          }}
        >
          <Card {...draggingCard} />
        </div>
      )}

      {selectedCard && (
        <CardModal card={selectedCard} onClose={() => setSelectedCard(null)} />
      )}

      {selectedLane && (
        <LaneModal lane={selectedLane} onClose={() => setSelectedLane(null)} />
      )}
    </div>
  );
}
