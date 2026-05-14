// components/sections/BoardLanes.tsx

import type { Card, Lane, LaneKey } from "@/engine/types";

import GameLane from "../game/GameLane";

type Props = {
  lanes: Lane[];

  laneRefs: Record<LaneKey, React.RefObject<HTMLDivElement | null>>;

  playerBoard: Record<LaneKey, Card[]>;
  enemyBoard: Record<LaneKey, Card[]>;

  getLanePower: (cards: Card[]) => number;

  getLaneWinner: (
    playerCards: Card[],
    enemyCards: Card[],
  ) => "player1" | "player2" | "draw";

  onCardSelect: (card: Card) => void;

  onLaneSelect: (lane: Lane) => void;

  movingCard: {
    cardId: string;
    fromLane: LaneKey;
  } | null;

  onMoveCard: (fromLane: LaneKey, toLane: LaneKey, cardId: string) => void;

  onSelectMoveCard: (
    value: {
      cardId: string;
      fromLane: LaneKey;
    } | null,
  ) => void;
};

export default function BoardLanes({
  lanes,
  laneRefs,
  playerBoard,
  enemyBoard,
  getLanePower,
  getLaneWinner,
  onCardSelect,
  onLaneSelect,
  movingCard,
  onMoveCard,
  onSelectMoveCard,
}: Props) {
  return (
    <main className="flex w-full justify-center">
      <div
        className="
          relative
          flex
          w-full
          justify-center

          gap-2
          sm:gap-3

          rounded-[28px]
          border
          border-white/10

          bg-[#0a1120]/70

          px-2
          py-3

          backdrop-blur-xl

          shadow-[0_16px_40px_rgba(0,0,0,.45)]
        "
      >
        {/* INNER LIGHT */}
        <div
          className="
            pointer-events-none
            absolute
            inset-0
            rounded-[28px]

            bg-[linear-gradient(180deg,rgba(255,255,255,0.05),transparent)]
          "
        />

        {lanes.map((lane) => {
          const playerCards = playerBoard[lane.id];

          const enemyCards = enemyBoard[lane.id];

          return (
            <GameLane
              key={lane.id}
              lane={lane}
              laneRef={laneRefs[lane.id]}
              playerCards={playerCards}
              enemyCards={enemyCards}
              playerPower={getLanePower(playerCards)}
              enemyPower={getLanePower(enemyCards)}
              result={getLaneWinner(playerCards, enemyCards)}
              onCardSelect={onCardSelect}
              onLaneSelect={onLaneSelect}
              movingCard={movingCard}
              onMoveCard={onMoveCard}
              onSelectMoveCard={onSelectMoveCard}
            />
          );
        })}
      </div>
    </main>
  );
}
