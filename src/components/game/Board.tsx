// components/game/Board.tsx

"use client";

import { useMemo, useRef, useState } from "react";

import { useGameStore } from "@/store/gameStore";

import type { Card, Lane, LaneKey } from "@/engine/types";

import {
  getGameWinner,
  getLanePower,
  getLaneWinner,
} from "@/engine/core/cardActions";

import Header from "../sections/Header";
import BoardLanes from "../sections/BoardLanes";
import PlayerHand from "../sections/PlayerHand";
import ActionBar from "../sections/ActionBar";

import GameCard from "./GameCard";

import CardPreview from "../preview/CardPreview";
import LanePreview from "../preview/LanePreview";

type PreviewLane = {
  name: string;

  description: string;

  image?: string;

  revealed?: boolean;
};

export default function Board() {
  const {
    gameState,
    playCard,
    moveCard,
    endTurn,
    restartGame,
    undoLastAction,
  } = useGameStore();

  const [selectedCard, setSelectedCard] = useState<Card | null>(null);

  const [selectedLane, setSelectedLane] = useState<PreviewLane | null>(null);

  const [movingCard, setMovingCard] = useState<{
    cardId: string;
    fromLane: LaneKey;
  } | null>(null);

  const [draggingCard, setDraggingCard] = useState<Card | null>(null);

  const [draggingIndex, setDraggingIndex] = useState<number | null>(null);

  const [touchPosition, setTouchPosition] = useState({
    x: 0,
    y: 0,
  });

  const [isDragging, setIsDragging] = useState(false);

  const laneRefs = {
    lane1: useRef<HTMLDivElement>(null),
    lane2: useRef<HTMLDivElement>(null),
    lane3: useRef<HTMLDivElement>(null),
  };

  const winner = useMemo(() => {
    if (!gameState) return "draw";

    return getGameWinner(gameState);
  }, [gameState]);

  if (!gameState) return null;

  const player = gameState.players.player1;

  const handleLaneDrop = () => {
    if (draggingIndex === null) return;

    for (const lane of gameState.lanes) {
      const rect = laneRefs[lane.id].current?.getBoundingClientRect();

      if (!rect) continue;

      const insideLane =
        touchPosition.x >= rect.left &&
        touchPosition.x <= rect.right &&
        touchPosition.y >= rect.top &&
        touchPosition.y <= rect.bottom;

      if (insideLane) {
        playCard("player1", draggingIndex, lane.id);

        break;
      }
    }

    setDraggingCard(null);

    setDraggingIndex(null);

    setIsDragging(false);
  };

  const handleLaneSelect = (lane: Lane) => {
    if (!lane.revealed) {
      setSelectedLane({
        name: "Hidden Location",

        description:
          lane.id === "lane2"
            ? "Reveals on Turn 2."
            : lane.id === "lane3"
              ? "Reveals on Turn 3."
              : "Reveals next turn.",

        image: "/assets/lanes/unrevealed.png",

        revealed: false,
      });

      return;
    }

    setSelectedLane({
      name: lane.name,

      description: lane.description || "No special effect.",

      image: lane.image || "/assets/lanes/fallback.png",

      revealed: true,
    });
  };

  const handleMoveCard = (
    fromLane: LaneKey,
    toLane: LaneKey,
    cardId: string,
  ) => {
    moveCard("player1", fromLane, toLane, cardId);

    setMovingCard(null);
  };

  return (
    <div
      className="
        relative
        min-h-screen
        overflow-hidden
        bg-[#060816]
        text-white
      "
    >
      {/* BACKGROUND */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="
            absolute
            inset-0
            bg-[radial-gradient(circle_at_top,#213a7d_0%,#10172d_35%,#050816_100%)]
          "
        />

        <div
          className="
            absolute
            left-[-15%]
            top-[8%]
            h-[320px]
            w-[320px]
            rounded-full
            bg-cyan-400/10
            blur-3xl
          "
        />

        <div
          className="
            absolute
            right-[-15%]
            bottom-[-10%]
            h-[320px]
            w-[320px]
            rounded-full
            bg-fuchsia-500/10
            blur-3xl
          "
        />

        {/* PIXEL GRID */}
        <div
          className="
            absolute
            inset-0
            opacity-[0.04]
          "
          style={{
            backgroundImage: `
              linear-gradient(to right, white 1px, transparent 1px),
              linear-gradient(to bottom, white 1px, transparent 1px)
            `,
            backgroundSize: "10px 10px",
          }}
        />
      </div>

      {/* MAIN */}
      <div
        className="
          relative
          z-10
          mx-auto
          flex
          min-h-screen
          w-full
          max-w-[560px]
          flex-col

          px-3
          pt-[max(12px,env(safe-area-inset-top))]
          pb-[max(20px,env(safe-area-inset-bottom))]

          gap-3
        "
      >
        <Header turn={gameState.turn} energy={player.energy} />

        {/* BOARD AREA */}
        <div
          className="
            flex
            flex-1
            items-center
            justify-center
            min-h-0
          "
        >
          <BoardLanes
            lanes={gameState.lanes}
            laneRefs={laneRefs}
            playerBoard={player.board}
            enemyBoard={gameState.players.player2.board}
            getLanePower={getLanePower}
            getLaneWinner={getLaneWinner}
            onCardSelect={setSelectedCard}
            onLaneSelect={handleLaneSelect}
            movingCard={movingCard}
            onMoveCard={handleMoveCard}
            onSelectMoveCard={setMovingCard}
          />
        </div>

        {/* HAND */}
        {gameState.currentPhase !== "end" && (
          <PlayerHand
            cards={player.hand}
            draggingIndex={draggingIndex}
            isDragging={isDragging}
            onCardPreview={setSelectedCard}
            onTouchStart={(event) => {
              const touch = event.touches[0];

              setTouchPosition({
                x: touch.clientX,
                y: touch.clientY,
              });

              (event.currentTarget as HTMLElement).dataset.dragX =
                touch.clientX.toString();

              (event.currentTarget as HTMLElement).dataset.dragY =
                touch.clientY.toString();
            }}
            onTouchMove={(event, card, index) => {
              const touch = event.touches[0];

              const startX = Number(
                (event.currentTarget as HTMLElement).dataset.dragX,
              );

              const startY = Number(
                (event.currentTarget as HTMLElement).dataset.dragY,
              );

              const deltaX = Math.abs(touch.clientX - startX);

              const deltaY = Math.abs(touch.clientY - startY);

              if (deltaX > 10 || deltaY > 10) {
                if (!isDragging) {
                  setDraggingCard(card);

                  setDraggingIndex(index);

                  setIsDragging(true);
                }
              }

              setTouchPosition({
                x: touch.clientX,
                y: touch.clientY,
              });
            }}
            onTouchEnd={handleLaneDrop}
          />
        )}

        {/* ACTION BAR */}
        <ActionBar
          currentPhase={gameState.currentPhase}
          onUndo={undoLastAction}
          onEndTurn={endTurn}
          onRestart={restartGame}
        />
      </div>

      {/* DRAG CARD */}
      {draggingCard && (
        <div
          className="
            pointer-events-none
            fixed
            z-[100]
          "
          style={{
            left: touchPosition.x - 38,
            top: touchPosition.y - 55,
          }}
        >
          <GameCard card={draggingCard} />
        </div>
      )}

      {/* PREVIEWS */}
      {selectedCard && (
        <CardPreview
          card={selectedCard}
          onClose={() => setSelectedCard(null)}
        />
      )}

      {selectedLane && (
        <LanePreview
          lane={selectedLane}
          onClose={() => setSelectedLane(null)}
        />
      )}
    </div>
  );
}
