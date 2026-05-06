import Card from "./Card";
import { MutableRefObject } from "react";

type Props = {
  lane: {
    id: "lane1" | "lane2" | "lane3";
    name: string;
    effect?: string;
  };
  playerCards: any[];
  enemyCards: any[];
  playerPower: number;
  enemyPower: number;
  result: "player1" | "player2" | "draw";
  laneRef: MutableRefObject<HTMLDivElement | null>;
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
        <div className="font-semibold leading-tight">{lane.name}</div>
        <div className="text-gray-500 leading-tight">{lane.effect || "-"}</div>
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
