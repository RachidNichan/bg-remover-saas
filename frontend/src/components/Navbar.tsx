"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { Sparkles, Zap, LogIn, LogOut, User } from "lucide-react";

interface NavbarProps {
  onOpenAuth: () => void;
  onOpenUpgrade: () => void;
}

export function Navbar({ onOpenAuth, onOpenUpgrade }: NavbarProps) {
  const { user, profile, signOutUser, isFirebaseConfigured } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const credits = profile?.credits ?? 3;

  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-white/10 bg-slate-950/95 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-cyan-400 p-[1.5px] transition-transform group-hover:scale-105">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-cyan-300" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-base sm:text-lg tracking-tight bg-gradient-to-r from-white via-slate-200 to-indigo-200 bg-clip-text text-transparent">
              Remove Backgrounds<span className="text-cyan-400"> Online</span>
            </span>
          </div>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
          <Link href="/#uploader" className="hover:text-white transition-colors">
            Online Remover
          </Link>
          <Link href="/#how-it-works" className="hover:text-white transition-colors">
            How It Works
          </Link>
          <Link href="/#comparison" className="hover:text-white transition-colors">
            Comparison
          </Link>
          <Link href="/#features" className="hover:text-white transition-colors">
            Features
          </Link>
          <Link href="/#pricing" className="hover:text-white transition-colors">
            Pricing
          </Link>
          <Link href="/#faq" className="hover:text-white transition-colors">
            FAQ
          </Link>
        </nav>

        {/* Right Section: Credits & Auth */}
        <div className="flex items-center gap-3">

          {/* Credits Counter Pill */}
          <button
            onClick={onOpenUpgrade}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-cyan-500/10 border border-indigo-500/30 text-indigo-200 hover:border-indigo-400 transition-all cursor-pointer"
          >
            <Zap className="w-3.5 h-3.5 text-cyan-400 fill-cyan-400" />
            <span>{credits} {credits === 1 ? "Credit" : "Credits"}</span>
            <span className="text-cyan-400 font-bold ml-0.5 hover:underline">+</span>
          </button>

          {/* Auth Controls */}
          {user ? (
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl hover:bg-slate-800/80 border border-transparent hover:border-slate-700 transition-all text-sm font-medium text-slate-200"
              >
                {user.photoURL ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={user.photoURL}
                    alt={user.displayName || "User avatar"}
                    className="w-7 h-7 rounded-full border border-indigo-500/40"
                  />
                ) : (
                  <div className="w-7 h-7 rounded-full bg-indigo-600 flex items-center justify-center text-xs font-bold text-white uppercase">
                    {(user.displayName || user.email || "U")[0]}
                  </div>
                )}
                <span className="hidden lg:inline text-xs text-slate-300 max-w-[100px] truncate">
                  {user.displayName || user.email?.split("@")[0]}
                </span>
              </button>

              {dropdownOpen && (
                <div
                  className="absolute right-0 mt-2 w-56 rounded-xl glass-panel border border-slate-700 bg-slate-900 shadow-xl py-2 z-50 text-xs"
                  onClick={() => setDropdownOpen(false)}
                >
                  <div className="px-3 py-2 border-b border-slate-800">
                    <p className="font-medium text-slate-200 truncate">
                      {user.displayName || "User"}
                    </p>
                    <p className="text-slate-400 truncate">{user.email}</p>
                    <p className="text-cyan-400 mt-1 font-semibold">
                      Balance: {credits} Credits
                    </p>
                  </div>

                  <button
                    onClick={onOpenUpgrade}
                    className="w-full text-left px-3 py-2 text-slate-300 hover:text-white hover:bg-slate-800 flex items-center gap-2"
                  >
                    <Zap className="w-3.5 h-3.5 text-indigo-400" />
                    Buy More Credits
                  </button>

                  <button
                    onClick={() => signOutUser()}
                    className="w-full text-left px-3 py-2 text-red-400 hover:text-red-300 hover:bg-slate-800 flex items-center gap-2 border-t border-slate-800 mt-1"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={onOpenAuth}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white shadow-sm hover:shadow-indigo-500/25 transition-all"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>Sign In</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
