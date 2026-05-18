// components/ui/PixelPanel.tsx

import { ReactNode } from "react";

type Props = {
  children: ReactNode;

  className?: string;
};

export default function PixelPanel({ children, className = "" }: Props) {
  return (
    <div
      className={`
        relative
        overflow-hidden
        rounded-[28px]
        border
        border-white/10
        bg-[#0d1017]/95
        shadow-[0_20px_60px_rgba(0,0,0,0.45)]
        backdrop-blur-xl

        before:absolute
        before:inset-0
        before:bg-[linear-gradient(to_bottom,rgba(255,255,255,0.06),transparent)]

        ${className}
      `}
    >
      <div className="relative z-10">{children}</div>
    </div>
  );
}
