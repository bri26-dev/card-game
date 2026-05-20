// components/menu/MainMenu.tsx

"use client";

import { useState } from "react";

import type { Account } from "@/engine/types/account";

import Hero from "./sections/Hero";
import Profile from "./sections/Profile";
import Navigation from "./sections/Navigation";

import LoadingScreen from "@/components/ui/LoadingScreen";
import ConfirmModal from "@/components/ui/ConfirmModal";

type Props = {
  account: Account;

  onPlay: () => void;

  onLogout: () => void;

  onDecks: () => void;

  onCollection: () => void;
};

export default function MainMenu({
  account,
  onPlay,
  onLogout,
  onDecks,
  onCollection,
}: Props) {
  const [loading, setLoading] = useState(false);

  const [loadingType, setLoadingType] = useState<"play" | "logout">("play");

  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const handlePlay = () => {
    setLoadingType("play");

    setLoading(true);

    setTimeout(() => {
      onPlay();

      setLoading(false);
    }, 900);
  };

  const handleLogout = () => {
    setShowLogoutConfirm(true);
  };

  const confirmLogout = () => {
    setShowLogoutConfirm(false);

    setLoadingType("logout");

    setLoading(true);

    setTimeout(() => {
      onLogout();

      setLoading(false);
    }, 700);
  };

  return (
    <>
      {loading &&
        (loadingType === "logout" ? (
          <div
            className="
              fixed
              inset-0
              z-[200]
              flex
              items-center
              justify-center
              bg-[#05070d]
            "
          >
            <div
              className="
                animate-pulse
                text-sm
                font-medium
                uppercase
                tracking-[0.3em]
                text-zinc-500
              "
            >
              Logging Out...
            </div>
          </div>
        ) : (
          <LoadingScreen text="Entering Arena..." />
        ))}

      <ConfirmModal
        open={showLogoutConfirm}
        title="Logout"
        description="Are you sure you want to logout from your account?"
        confirmText="Logout"
        cancelText="Cancel"
        danger
        onCancel={() => setShowLogoutConfirm(false)}
        onConfirm={confirmLogout}
      />

      <div
        className="
          relative
          min-h-screen
          overflow-hidden
          bg-[#05070d]
          text-white
        "
      >
        {/* BACKGROUND */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.10),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(168,85,247,0.10),transparent_40%)]" />

          <div
            className="
              absolute
              inset-0
              opacity-[0.04]
              [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)]
              [background-size:34px_34px]
            "
          />
        </div>

        {/* CONTENT */}
        <div
          className="
            relative
            z-10
            mx-auto
            flex
            min-h-screen
            w-full
            max-w-md
            flex-col
            gap-3
            px-3
            pb-24
            pt-3
          "
        >
          <Profile account={account} />

          <div className="min-h-0 flex-1">
            <Hero onPlay={handlePlay} />
          </div>
        </div>

        <Navigation
          active="battle"
          onBattle={() => {}}
          onDecks={onDecks}
          onCollection={onCollection}
          onLogout={handleLogout}
        />
      </div>
    </>
  );
}
