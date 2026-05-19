// components/menu/Login.tsx

"use client";

import { useMemo, useState } from "react";

type Props = {
  onLogin: (username: string, password: string) => void;

  onRegister: (username: string, password: string) => void;

  authError: string;

  authSuccess: string;

  clearAuthError: () => void;

  clearAuthSuccess: () => void;
};

export default function Login({
  onLogin,
  onRegister,
  authError,
  authSuccess,
  clearAuthError,
  clearAuthSuccess,
}: Props) {
  const [isRegister, setIsRegister] = useState(false);

  const [username, setUsername] = useState("");

  const [password, setPassword] = useState("");

  const [submitted, setSubmitted] = useState(false);

  const usernameError = useMemo(() => {
    if (!username.trim()) {
      return "Please enter a username.";
    }

    if (username.trim().length < 3) {
      return "Username must be at least 3 characters.";
    }

    return "";
  }, [username]);

  const passwordError = useMemo(() => {
    if (!password.trim()) {
      return "Please enter a password.";
    }

    if (password.trim().length < 4) {
      return "Password must be at least 4 characters.";
    }

    return "";
  }, [password]);

  const validationError = useMemo(() => {
    if (usernameError) return usernameError;

    if (passwordError) return passwordError;

    return "";
  }, [usernameError, passwordError]);

  const errorMessage =
    submitted && (authError || validationError)
      ? authError || validationError
      : "";

  const handleSubmit = () => {
    setSubmitted(true);

    clearAuthError();

    clearAuthSuccess();

    if (validationError) {
      return;
    }

    if (isRegister) {
      onRegister(username.trim(), password.trim());

      /*
      AUTO RETURN TO LOGIN AFTER REGISTER
    */

      setIsRegister(false);

      /*
      CLEAR INPUTS
    */

      setUsername("");

      setPassword("");

      setSubmitted(false);

      return;
    }

    onLogin(username.trim(), password.trim());
  };

  const handleSwitchMode = () => {
    setIsRegister((prev) => !prev);

    setUsername("");

    setPassword("");

    setSubmitted(false);

    clearAuthError();

    clearAuthSuccess();
  };

  return (
    <div
      className="
        relative
        flex
        min-h-screen
        items-center
        justify-center
        overflow-hidden
        bg-[#05070d]
        px-4
        py-6
      "
    >
      {/* BACKGROUND */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.12),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(168,85,247,0.10),transparent_40%)]" />

        <div
          className="
            absolute
            inset-0
            opacity-[0.04]
            [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)]
            [background-size:34px_34px]
          "
        />

        <div
          className="
            absolute
            left-[-100px]
            top-[10%]
            h-[220px]
            w-[220px]
            rounded-full
            bg-cyan-500/10
            blur-3xl
          "
        />

        <div
          className="
            absolute
            bottom-[-100px]
            right-[-80px]
            h-[220px]
            w-[220px]
            rounded-full
            bg-violet-500/10
            blur-3xl
          "
        />
      </div>

      {/* CARD */}
      <div
        className="
          relative
          z-10
          w-full
          max-w-sm
          overflow-hidden
          rounded-[32px]
          border
          border-white/10
          bg-[#0b1018]/90
          p-5
          shadow-[0_20px_60px_rgba(0,0,0,0.5)]
          backdrop-blur-xl
        "
      >
        {/* GLOW */}
        <div
          className="
            absolute
            left-1/2
            top-0
            h-[180px]
            w-[180px]
            -translate-x-1/2
            rounded-full
            bg-cyan-500/10
            blur-3xl
          "
        />

        <div className="relative z-10">
          {/* HEADER */}
          <div className="text-center">
            <div className="text-[10px] uppercase tracking-[0.35em] text-cyan-300">
              Pixel Card Arena
            </div>

            <div className="mt-3 text-4xl font-black uppercase text-white">
              {isRegister ? "Register" : "Login"}
            </div>

            <div className="mt-2 text-sm text-zinc-400">
              Enter your commander credentials
            </div>
          </div>

          {/* FORM */}
          <div className="mt-7 space-y-4">
            {/* USERNAME */}
            <input
              value={username}
              onChange={(event) => {
                setUsername(event.target.value);
              }}
              placeholder="Username"
              className={`
                w-full
                rounded-[20px]
                border
                bg-white/[0.03]
                px-4
                py-3.5
                text-sm
                text-white
                outline-none
                transition-all
                placeholder:text-zinc-500
                ${
                  errorMessage
                    ? "border-red-500/30 focus:border-red-500/50"
                    : "border-white/10 focus:border-cyan-400/40 focus:bg-cyan-500/[0.04]"
                }
              `}
            />

            {/* PASSWORD */}
            <div>
              <input
                type="password"
                value={password}
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
                placeholder="Password"
                className={`
                  w-full
                  rounded-[20px]
                  border
                  bg-white/[0.03]
                  px-4
                  py-3.5
                  text-sm
                  text-white
                  outline-none
                  transition-all
                  placeholder:text-zinc-500
                  ${
                    errorMessage
                      ? "border-red-500/30 focus:border-red-500/50"
                      : "border-white/10 focus:border-cyan-400/40 focus:bg-cyan-500/[0.04]"
                  }
                `}
              />

              {/* ERROR MESSAGE */}
              {errorMessage && (
                <div className="mt-2 px-1 text-center text-xs text-red-400">
                  {errorMessage}
                </div>
              )}

              {/* SUCCESS MESSAGE */}
              {authSuccess && (
                <div className="mt-2 px-1 text-center text-xs font-medium text-emerald-400">
                  {authSuccess}
                </div>
              )}
            </div>
          </div>

          {/* BUTTON */}
          <button
            onClick={handleSubmit}
            className="
              mt-5
              w-full
              rounded-[22px]
              border
              border-cyan-400/30
              bg-cyan-500/20
              px-5
              py-4
              text-sm
              font-black
              uppercase
              tracking-[0.16em]
              text-cyan-100
              transition-all
              hover:bg-cyan-500/30
              active:scale-[0.98]
            "
          >
            {isRegister ? "Create Account" : "Enter"}
          </button>

          {/* SWITCH */}
          <div className="mt-6 text-center">
            <button
              onClick={handleSwitchMode}
              className="
                text-sm
                text-zinc-400
                transition-all
                hover:text-white
              "
            >
              {isRegister ? (
                <>
                  Already have an account?{" "}
                  <span className="font-semibold text-cyan-300 underline underline-offset-4">
                    Login
                  </span>
                </>
              ) : (
                <>
                  No account yet?{" "}
                  <span className="font-semibold text-cyan-300 underline underline-offset-4">
                    Register
                  </span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
