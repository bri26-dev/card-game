"use client";

import { Bot, User2 } from "lucide-react";

type PlayerInfo = {
  name: string;
  avatar?: string;
  isAI?: boolean;
};

type Props = {
  energy: number;

  insufficientEnergy?: boolean;

  player?: PlayerInfo;

  opponent?: PlayerInfo;
};

export default function Header({
  energy,
  insufficientEnergy = false,

  player = {
    name: "Player",
  },

  opponent = {
    name: "Arena Bot",
    isAI: true,
  },
}: Props) {
  return (
    <header className="shrink-0">
      <div className="px-2 pt-1 pb-1">
        <div className="flex items-center justify-between">
          {/* PLAYER */}
          <div className="flex flex-1 min-w-0 items-center gap-2">
            <div className="relative shrink-0">
              <div
                className="
                absolute
                inset-0
                rounded-[18px]
                bg-cyan-400/20
                blur-xl
              "
              />

              <div
                className="
                relative
                h-[48px]
                w-[48px]

                overflow-hidden
                rounded-[18px]

                border
                border-cyan-300/15

                bg-[linear-gradient(145deg,#0c111c,#121826)]

                flex
                items-center
                justify-center

                shadow-[0_0_20px_rgba(34,211,238,.10)]
              "
              >
                <div
                  className="
                  absolute
                  inset-0
                  bg-[radial-gradient(circle_at_top,rgba(255,255,255,.15),transparent_55%)]
                "
                />

                {player.avatar ? (
                  <img
                    src={player.avatar}
                    alt={player.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <User2 size={20} className="text-cyan-100" />
                )}
              </div>
            </div>

            <div className="min-w-0">
              <div
                className="
                text-[8px]
                uppercase
                tracking-[0.3em]
                text-cyan-300/50
                font-bold
              "
              >
                Player
              </div>

              <div
                className="
                truncate
                text-[13px]
                font-black
                text-white
              "
              >
                {player.name}
              </div>
            </div>
          </div>

          {/* ENERGY */}
          <div className="relative flex flex-col items-center justify-center shrink-0">
            {/* glow */}
            <div
              className="
      absolute
      h-[68px]
      w-[68px]
      rounded-full
      blur-2xl

      bg-cyan-400/20
    "
            />

            {/* energy core */}
            <div
              className="
      relative

      h-[42px]
      w-[42px]

      rounded-full

      flex
      items-center
      justify-center

      border
      border-cyan-100/30

      bg-[radial-gradient(circle,rgba(80,220,255,.95)_0%,rgba(14,165,233,.9)_50%,rgba(2,6,23,1)_100%)]

      shadow-[0_0_30px_rgba(56,189,248,.8)]
    "
            >
              {/* tiny shine */}
              <div
                className="
        absolute
        top-[6px]
        left-[9px]

        h-[10px]
        w-[16px]

        rounded-full

        bg-white/70
        blur-sm
      "
              />

              <span
                className={`
        relative
        text-[24px]
        font-black

        ${
          insufficientEnergy
            ? "animate-[energyReject_.4s_ease_1]"
            : "text-white drop-shadow-[0_0_10px_rgba(255,255,255,.9)]"
        }
      `}
              >
                {energy}
              </span>
            </div>
          </div>

          {/* OPPONENT */}
          <div className="flex flex-1 items-center justify-end gap-2">
            <div className="min-w-0 text-right">
              <div
                className="
                text-[8px]
                uppercase
                tracking-[0.3em]
                text-violet-300/50
                font-bold
              "
              >
                Opponent
              </div>

              <div
                className="
                truncate
                text-[13px]
                font-black
                text-white
              "
              >
                {opponent.name}
              </div>
            </div>

            <div className="relative">
              <div
                className="
                absolute
                inset-0
                rounded-[18px]
                bg-violet-400/20
                blur-xl
              "
              />

              <div
                className="
                relative
                h-[48px]
                w-[48px]

                rounded-[18px]

                border
                border-violet-300/15

                bg-[linear-gradient(145deg,#121826,#0c111c)]

                flex
                items-center
                justify-center

                shadow-[0_0_20px_rgba(168,85,247,.1)]
              "
              >
                {opponent.avatar ? (
                  <img
                    src={opponent.avatar}
                    alt={opponent.name}
                    className="h-full w-full object-cover"
                  />
                ) : opponent.isAI ? (
                  <Bot size={20} className="text-violet-100" />
                ) : (
                  <User2 size={20} className="text-violet-100" />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
