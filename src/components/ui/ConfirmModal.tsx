"use client";

type Props = {
  open: boolean;

  title: string;

  description: string;

  confirmText?: string;

  cancelText?: string;

  danger?: boolean;

  onConfirm: () => void;

  onCancel: () => void;
};

export default function ConfirmModal({
  open,
  title,
  description,
  confirmText = "Confirm",
  cancelText = "Cancel",
  danger = false,
  onConfirm,
  onCancel,
}: Props) {
  if (!open) return null;

  return (
    <div
      className="
        fixed
        inset-0
        z-[300]
        flex
        items-center
        justify-center
        bg-black/60
        px-4
        backdrop-blur-md
      "
    >
      <div
        className="
          relative
          w-full
          max-w-[340px]
          overflow-hidden
          rounded-[28px]
          border
          border-white/10
          bg-[#0b1018]/95
          shadow-[0_25px_80px_rgba(0,0,0,0.6)]
        "
      >
        {/* GLOW */}
        <div
          className={`
            absolute
            left-1/2
            top-[-60px]
            h-[160px]
            w-[160px]
            -translate-x-1/2
            rounded-full
            blur-3xl

            ${danger ? "bg-red-500/20" : "bg-cyan-500/20"}
          `}
        />

        <div className="relative z-10 p-5">
          <div
            className="
              text-center
              text-lg
              font-black
              uppercase
              tracking-[0.18em]
              text-white
            "
          >
            {title}
          </div>

          <div
            className="
              mt-3
              text-center
              text-sm
              leading-relaxed
              text-zinc-400
            "
          >
            {description}
          </div>

          <div className="mt-5 flex gap-2">
            <button
              onClick={onCancel}
              className="
                flex-1
                rounded-[18px]
                border
                border-white/10
                bg-white/[0.05]
                px-4
                py-3
                text-sm
                font-bold
                text-zinc-300
                transition
                hover:bg-white/[0.08]
              "
            >
              {cancelText}
            </button>

            <button
              onClick={onConfirm}
              className={`
                flex-1
                rounded-[18px]
                px-4
                py-3
                text-sm
                font-black
                uppercase
                tracking-[0.12em]
                transition

                ${
                  danger
                    ? "bg-red-500/20 text-red-100 hover:bg-red-500/30"
                    : "bg-cyan-500/20 text-cyan-100 hover:bg-cyan-500/30"
                }
              `}
            >
              {confirmText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
