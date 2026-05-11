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

  // ✅ MOVE SYSTEM
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
    <main className="flex flex-1 items-center justify-center">
      <div className="flex gap-2">
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
              // ✅ MOVE SYSTEM WIRED
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
