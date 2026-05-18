"use client";

import { useState } from "react";

import PixelPanel from "../ui/PixelPanel";

import MenuButton from "./MenuButton";

type Props = {
  onCreate: (username: string) => void;
};

export default function Login({ onCreate }: Props) {
  const [username, setUsername] = useState("");

  return (
    <div
      className="
        fixed
        inset-0
        z-50
        flex
        items-center
        justify-center
        bg-black/80
        p-4
        backdrop-blur-md
      "
    >
      <PixelPanel className="w-full max-w-md p-6">
        <div className="text-center">
          <div className="text-xs uppercase tracking-[0.35em] text-zinc-500">
            Welcome Player
          </div>

          <div className="mt-3 text-3xl font-black uppercase text-white">
            Login
          </div>
        </div>

        <div className="mt-8">
          <input
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            placeholder="Enter Username"
            className="
              w-full
              rounded-[20px]
              border
              border-white/10
              bg-white/[0.04]
              px-5
              py-4
              text-white
              outline-none
              placeholder:text-zinc-500
            "
          />
        </div>

        <div className="mt-6">
          <MenuButton
            label="Start Journey"
            variant="primary"
            onClick={() => {
              if (!username.trim()) return;

              onCreate(username.trim());
            }}
          />
        </div>
      </PixelPanel>
    </div>
  );
}
