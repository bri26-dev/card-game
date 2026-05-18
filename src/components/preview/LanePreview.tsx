import Image from "next/image";

type Props = {
  lane: {
    name: string;

    description: string;

    image?: string;

    revealed?: boolean;
  };

  onClose: () => void;
};

export default function LanePreview({ lane, onClose }: Props) {
  return (
    <div
      onClick={onClose}
      className="
        fixed
        inset-0
        z-[200]
        flex
        items-center
        justify-center
        bg-[#050816]/45
        p-4
        backdrop-blur-[8px]
      "
    >
      {/* BG GLOW */}
      <div
        className="
          absolute
          inset-0
          bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.08)_0%,transparent_65%)]
        "
      />

      {/* PREVIEW */}
      <div
        onClick={(event) => event.stopPropagation()}
        className="
          relative
          w-full
          max-w-[430px]
          overflow-hidden
          rounded-[34px]
          border
          border-white/10
          bg-[#0a0f1d]
          shadow-[0_25px_90px_rgba(0,0,0,0.6)]
        "
      >
        {/* LANDSCAPE ART */}
        <div
          className="
            relative
            h-[270px]
            w-full
            overflow-hidden
          "
        >
          <Image
            src={lane.image || "/assets/lanes/fallback.png"}
            alt={lane.name}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 430px"
            className="
    object-cover
    object-center
  "
          />

          {/* TOP OVERLAY */}
          <div
            className="
              absolute
              inset-0
              bg-gradient-to-b
              from-black/15
              via-transparent
              to-black/10
            "
          />

          {/* TEXT AREA GRADIENT */}
          <div
            className="
              absolute
              inset-x-0
              bottom-0
              h-[120px]
              bg-gradient-to-t
              from-black
              via-black/78
              to-transparent
            "
          />

          {/* EDGE VIGNETTE */}
          <div
            className="
              absolute
              inset-0
              bg-[radial-gradient(circle_at_center,transparent_55%,rgba(0,0,0,0.45)_100%)]
            "
          />

          {/* HIDDEN EFFECT */}
          {!lane.revealed && (
            <div
              className="
                absolute
                inset-0
                bg-black/35
                backdrop-blur-[3px]
              "
            />
          )}

          {/* CONTENT */}
          <div
            className="
              absolute
              bottom-0
              left-0
              z-20
              w-full
              px-5
              pb-5
            "
          >
            {/* TITLE */}
            <div
              className="
                text-center
                text-[30px]
                font-black
                uppercase
                tracking-[0.08em]
                text-white
                drop-shadow-[0_4px_12px_rgba(0,0,0,0.95)]
              "
            >
              {lane.name}
            </div>

            {/* DESCRIPTION */}
            <div
              className="
                px-4
                py-3
                text-center
                text-[12px]
                leading-relaxed
                text-zinc-200
              "
            >
              {lane.description}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
