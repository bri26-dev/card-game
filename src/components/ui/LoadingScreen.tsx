"use client";

type Props = {
  text?: string;
};

export default function LoadingScreen({ text = "Preparing Battle..." }: Props) {
  return (
    <div
      className="
        fixed
        inset-0
        z-[200]
        overflow-hidden
        bg-[#05070d]
        text-white
      "
    >
      {/* BACKGROUND */}
      <div className="absolute inset-0">
        <div
          className="
            absolute
            left-[-10%]
            top-[5%]
            h-[260px]
            w-[260px]
            rounded-full
            bg-cyan-500/10
            blur-3xl
            animate-pulse
          "
        />

        <div
          className="
            absolute
            bottom-[-10%]
            right-[-5%]
            h-[240px]
            w-[240px]
            rounded-full
            bg-violet-500/10
            blur-3xl
            animate-pulse
          "
        />
      </div>

      {/* CONTENT */}
      <div
        className="
          relative
          z-10
          flex
          h-full
          flex-col
          items-center
          justify-center
          px-6
          text-center
        "
      >
        {/* TITLE */}
        <div
          className="
            text-xl
            font-black
            uppercase
            tracking-[0.22em]
            text-white
          "
        >
          {text}
        </div>

        {/* SUBTEXT */}
        <div
          className="
            mt-3
            text-sm
            text-zinc-400
          "
        >
          Synchronizing arena systems...
        </div>

        {/* LOADING BAR */}
        <div
          className="
            mt-8
            h-[6px]
            w-[220px]
            overflow-hidden
            rounded-full
            bg-white/5
          "
        >
          <div
            className="
              h-full
              w-1/2
              rounded-full
              bg-gradient-to-r
              from-cyan-400
              to-violet-400
              animate-[loading_1.2s_ease-in-out_infinite]
            "
          />
        </div>
      </div>
    </div>
  );
}
