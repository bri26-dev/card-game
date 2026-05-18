// components/menu/MenuButton.tsx

"use client";

import type { ReactNode } from "react";

type Props = {
  label?: string;

  children?: ReactNode;

  onClick?: () => void;

  disabled?: boolean;

  variant?: "primary" | "danger" | "default";
};

export default function MenuButton({
  label,
  children,
  onClick,
  disabled,
  variant = "default",
}: Props) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        relative
        w-full
        overflow-hidden
        rounded-[22px]
        border
        px-5
        py-4
        text-sm
        font-black
        uppercase
        tracking-[0.14em]
        transition-all
        duration-200

        ${
          variant === "primary"
            ? `
              border-cyan-400/30
              bg-cyan-500/20
              text-cyan-100
              hover:bg-cyan-500/30
            `
            : variant === "danger"
              ? `
                border-red-400/30
                bg-red-500/15
                text-red-100
                hover:bg-red-500/25
              `
              : `
                border-white/10
                bg-white/[0.04]
                text-white
                hover:bg-white/[0.08]
              `
        }

        ${disabled ? "cursor-not-allowed opacity-40" : "active:scale-[0.98]"}
      `}
    >
      <div
        className="
          absolute
          inset-0
          opacity-0
          transition-opacity
          duration-200
          hover:opacity-100
          bg-[linear-gradient(to_bottom,rgba(255,255,255,0.08),transparent)]
        "
      />

      <div className="relative z-10">{label || children}</div>
    </button>
  );
}
