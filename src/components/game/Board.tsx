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

import { getLaneEffectText } from "@/engine/effects/laneEffects";

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

  const laneRefs: Record<LaneKey, React.RefObject<HTMLDivElement | null>> = {
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
      });

      return;
    }

    setSelectedLane({
      name: lane.name,
      description: getLaneEffectText(lane.effect),
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
    <div className="flex h-screen flex-col bg-zinc-100 text-black">
      <Header turn={gameState.turn} energy={player.energy} />

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

      <ActionBar
        currentPhase={gameState.currentPhase}
        onUndo={undoLastAction}
        onEndTurn={endTurn}
        onRestart={restartGame}
      />

      {gameState.currentPhase === "end" && (
        <div
          className="
            pointer-events-none
            absolute
            inset-0
            flex
            items-center
            justify-center
            mb-150
          "
        >
          <div
            className="
              rounded-3xl
              bg-black/70
              px-8
              py-5
              text-center
              text-white
              backdrop-blur-md
            "
          >
            <div className="text-xs uppercase tracking-[0.3em] opacity-70">
              Match Result
            </div>

            <div className="mt-2 text-3xl font-black">
              {winner === "draw"
                ? "DRAW"
                : winner === "player1"
                  ? "YOU WIN"
                  : "YOU LOSE"}
            </div>
          </div>
        </div>
      )}

      {draggingCard && (
        <div
          className="
            pointer-events-none
            fixed
            z-[100]
            scale-[1.15]
            drop-shadow-2xl
            will-change-transform
          "
          style={{
            left: touchPosition.x - 32,
            top: touchPosition.y - 48,
          }}
        >
          <GameCard card={draggingCard} />
        </div>
      )}

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
