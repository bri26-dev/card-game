// components/Lanes.tsx

import Card from "./Card";
import { MutableRefObject } from "react";
import { Lane as LaneType } from "@/engine/types";

type Props = {
  lane: LaneType;
  playerCards: any[];
  enemyCards: any[];
  playerPower: number;
  enemyPower: number;
  result: "player1" | "player2" | "draw";
  laneRef: MutableRefObject<HTMLDivElement | null>;

  onCardClick: (card: any) => void;
};

const getEffectText = (effect?: string) => {
  switch (effect) {
    // ===== ONGOING =====
    case "boost_all":
      return "Cards here have +1 Power";

    case "weaken_all":
      return "Cards here have -1 Power";

    // ===== EACH TURN =====
    case "draw_bonus":
      return "Winning here gives +1 Energy next turn";

    // ===== TURN 5 =====
    case "power_if_winning":
      return "Turn 5: Winning side gains +1 Power";

    // ===== ON REVEAL =====
    case "reveal_buff":
      return "When revealed, cards here gain +1 Power";

    // ===== END GAME =====
    case "final_power":
      return "End Game: Cards here gain +2 Power";

    default:
      return "No special effect";
  }
};

export default function Lane({
  lane,
  playerCards,
  enemyCards,
  playerPower,
  enemyPower,
  result,
  laneRef,
  onCardClick,
}: Props) {
  return (
    <div className="w-[110px] h-[320px] flex flex-col items-center">
      <div className="h-[110px] flex flex-col items-center justify-end">
        <div className="grid grid-cols-2 gap-[2px]">
          {enemyCards.map((c, i) => (
            <div key={i} className="scale-[0.5]">
              {c.revealed ? (
                <Card {...c} onClick={() => onCardClick(c)} />
              ) : (
                <div className="w-16 h-24 rounded-xl bg-blue-900 border border-blue-400" />
              )}
            </div>
          ))}
        </div>

        <div className="text-[10px] mb-[2px]">
          ({enemyPower}) {result === "player2" ? "✓" : ""}
        </div>
      </div>

      <div
        ref={laneRef}
        className={`
    h-[60px] w-full flex flex-col items-center justify-center
    border rounded text-[10px] transition-all

    ${
      result === "player1"
        ? "bg-green-50 border-green-400"
        : result === "player2"
          ? "bg-red-50 border-red-400"
          : "bg-white border-gray-300"
    }
  `}
      >
        {lane.revealed ? (
          <>
            <div className="font-semibold leading-tight">{lane.name}</div>
            <div className="text-[8px] p-1 text-gray-500 text-center leading-tight">
              {getEffectText(lane.effect)}
            </div>
          </>
        ) : (
          <div className="text-[9px] text-gray-400 italic">Hidden Location</div>
        )}
      </div>

      <div className="h-[110px] flex flex-col items-center justify-start">
        <div className="text-[10px] mt-[2px]">
          ({playerPower}) {result === "player1" ? "✓" : ""}
        </div>

        <div className="grid grid-cols-2 gap-[2px]">
          {playerCards.map((c, i) => (
            <div key={i} className="scale-[0.5]">
              <Card {...c} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
