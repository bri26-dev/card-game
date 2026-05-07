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
};

const getEffectText = (effect?: string) => {
  switch (effect) {
    case "boost_all":
      return "+1 Power to cards here";
    case "weaken_all":
      return "-1 Power to cards here";
    case "draw_bonus":
      return "Leader gains +1 Energy";
    default:
      return "No effect";
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
}: Props) {
  return (
    <div className="w-[110px] h-[320px] flex flex-col items-center">
      <div className="h-[110px] flex flex-col items-center justify-end">
        <div className="grid grid-cols-2 gap-[2px]">
          {enemyCards.map((c, i) => (
            <div key={i} className="scale-[0.5]">
              <Card {...c} />
            </div>
          ))}
        </div>

        <div className="text-[10px] mb-[2px]">
          ({enemyPower}) {result === "player2" ? "✓" : ""}
        </div>
      </div>

      <div
        ref={laneRef}
        className="h-[50px] w-full flex flex-col items-center justify-center border rounded bg-white text-[10px]"
      >
        {lane.revealed ? (
          <>
            <div className="font-semibold leading-tight">{lane.name}</div>
            <div className="text-[8px] text-gray-500 leading-tight">
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
