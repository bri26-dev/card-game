import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "Card Battle",
  description: "Premium pixel strategy card game",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <div className="relative flex min-h-screen flex-col overflow-hidden">
          {/* BACKGROUND GLOW */}
          <div
            className="
              pointer-events-none
              absolute
              inset-0
              opacity-60
            "
          >
            <div
              className="
                absolute
                left-1/2
                top-[-20%]
                h-[500px]
                w-[500px]
                -translate-x-1/2
                rounded-full
                bg-blue-500/10
                blur-3xl
              "
            />

            <div
              className="
                absolute
                bottom-[-15%]
                right-[-10%]
                h-[400px]
                w-[400px]
                rounded-full
                bg-violet-500/10
                blur-3xl
              "
            />
          </div>

          {children}
        </div>
      </body>
    </html>
  );
}
