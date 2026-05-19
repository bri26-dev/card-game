// components/game/Board.tsx

"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import { useGameStore } from "@/store/gameStore";

import type { Card, Lane, LaneKey } from "@/engine/types/types";

import {
  getGameWinner,
  getLanePower,
  getLaneWinner,
} from "@/engine/core/cardActions";

import Header from "./sections/Header";
import BoardLanes from "./sections/BoardLanes";
import PlayerHand from "./sections/PlayerHand";
import ActionBar from "./sections/ActionBar";

import GameCard from "./GameCard";

import CardPreview from "../preview/CardPreview";
import LanePreview from "../preview/LanePreview";

type PreviewLane = {
  name: string;

  description: string;

  image?: string;

  revealed?: boolean;
};

type Props = {
  onReturnToMenu?: () => void;
};

export default function Board({ onReturnToMenu }: Props) {
  const {
    gameState,
    playCard,
    moveCard,
    endTurn,
    restartGame,
    undoLastAction,
    surrenderGame,
    canUndo,
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

  const [showWinnerBanner, setShowWinnerBanner] = useState(false);

  const laneRefs = {
    lane1: useRef<HTMLDivElement>(null),
    lane2: useRef<HTMLDivElement>(null),
    lane3: useRef<HTMLDivElement>(null),
  };

  const winner = useMemo(() => {
    if (!gameState) return "draw";

    return getGameWinner(gameState);
  }, [gameState]);

  useEffect(() => {
    if (!gameState) return;

    /*
    HIDE IMMEDIATELY
    WHEN NOT END PHASE
  */
    if (gameState.currentPhase !== "end") {
      setShowWinnerBanner(false);

      return;
    }

    /*
    SHOW BANNER
  */
    setShowWinnerBanner(true);

    /*
    AUTO HIDE
  */
    const timeout = setTimeout(() => {
      setShowWinnerBanner(false);
    }, 3000);

    return () => {
      clearTimeout(timeout);

      setShowWinnerBanner(false);
    };
  }, [gameState?.currentPhase]);

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
        text-white
      "
    >
      {/* BACKGROUND */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="
            absolute
            left-[-15%]
            top-[5%]
            h-[240px]
            w-[240px]
            rounded-full
            bg-cyan-400/10
            blur-3xl
          "
        />

        <div
          className="
            absolute
            right-[-10%]
            bottom-[-8%]
            h-[220px]
            w-[220px]
            rounded-full
            bg-fuchsia-500/10
            blur-3xl
          "
        />
      </div>

      {/* MAIN */}
      <div
        className="
          relative
          z-10
          mx-auto

          flex
          h-screen
          w-full
          max-w-[540px]
          flex-col

          px-2
          sm:px-3

          pt-[max(8px,env(safe-area-inset-top))]
          pb-[max(10px,env(safe-area-inset-bottom))]

          gap-2
          sm:gap-3
        "
      >
        <Header turn={gameState.turn} energy={player.energy} />

        {/* BOARD */}
        <div
          className="
    relative
    flex
    flex-1
    items-center
    justify-center
    min-h-0
  "
        >
          {showWinnerBanner && (
            <div
              className="
      pointer-events-none
      absolute
      left-1/2
      top-1/2
      z-30
      w-full

      -translate-x-1/2
      -translate-y-1/2

      animate-[fadeIn_.35s_ease]

      overflow-hidden

      border
      border-white/10

      bg-white/[0.06]
      backdrop-blur-2xl

      shadow-[0_20px_80px_rgba(0,0,0,0.55)]
    "
            >
              {/* BACKGROUND EFFECTS */}
              <div
                className={`
        absolute
        -top-10
        left-1/2
        h-[140px]
        w-[140px]
        -translate-x-1/2
        rounded-full
        blur-3xl

        ${
          winner === "player1"
            ? "bg-cyan-500/20"
            : winner === "player2"
              ? "bg-red-500/20"
              : "bg-yellow-500/20"
        }
      `}
              />

              <div className="relative z-10 px-4 py-3 text-center">
                {/* SMALL LABEL */}
                <div
                  className="
          text-[10px]
          font-bold
          uppercase
          tracking-[0.35em]
          text-zinc-400
        "
                >
                  Match Complete
                </div>

                {/* MAIN RESULT */}
                <div
                  className={`
          text-3xl
          font-black
          uppercase
          tracking-[0.18em]

          ${
            winner === "player1"
              ? "text-cyan-200"
              : winner === "player2"
                ? "text-red-200"
                : "text-yellow-200"
          }
        `}
                >
                  {winner === "player1"
                    ? "Victory"
                    : winner === "player2"
                      ? "Defeat"
                      : "Draw"}
                </div>
              </div>
            </div>
          )}
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
        <div
          className="
    transition-opacity
    duration-300
  "
        >
          <PlayerHand
            cards={player.hand}
            draggingIndex={draggingIndex}
            isDragging={isDragging}
            disableDragging={gameState.currentPhase === "end"}
            onCardPreview={setSelectedCard}
            onTouchStart={(event) => {
              if (gameState.currentPhase === "end") return;

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
              if (gameState.currentPhase === "end") return;

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
            onTouchEnd={() => {
              if (gameState.currentPhase === "end") return;

              handleLaneDrop();
            }}
          />
        </div>

        {/* ACTION BAR */}
        <ActionBar
          currentPhase={gameState.currentPhase}
          canUndo={canUndo()}
          onUndo={undoLastAction}
          onSurrender={surrenderGame}
          onEndTurn={endTurn}
          onRestart={restartGame}
          onReturnToMenu={onReturnToMenu}
        />
      </div>

      {/* DRAGGING CARD */}
      {draggingCard && (
        <div
          className="
            pointer-events-none
            fixed
            z-[100]

            scale-[0.9]
            sm:scale-100
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
