"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { Sparkles, LogIn, LogOut } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

interface NavbarProps {
  onOpenAuth: () => void;
}

export function Navbar({ onOpenAuth }: NavbarProps) {
  const { user, signOutUser } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-neutral-200/90 dark:border-neutral-800/80 bg-white/95 dark:bg-[#0c0e0d]/95 backdrop-blur-md transition-colors duration-150">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center transition-colors group-hover:border-emerald-500/50">
            <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div className="flex flex-col">
            <span className="font-semibold text-base sm:text-lg tracking-tight text-neutral-900 dark:text-white">
              Remove Backgrounds<span className="text-emerald-600 dark:text-emerald-400 font-bold"> Online</span>
            </span>
          </div>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden sm:flex items-center gap-6 text-sm font-medium text-neutral-600 dark:text-neutral-400">
          <Link href="/remove-background" className="hover:text-neutral-900 dark:hover:text-white transition-colors">
            Remove Background
          </Link>
          <Link href="/faq" className="hover:text-neutral-900 dark:hover:text-white transition-colors">
            FAQ
          </Link>
        </nav>

        {/* Right Section: Theme Toggle, 100% Free Badge, Auth */}
        <div className="flex items-center gap-2.5">
          {/* 100% Free Badge */}
          <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 border border-emerald-500/25 text-emerald-700 dark:text-emerald-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-pulse" />
            <span>100% Free</span>
          </div>

          {/* Theme Switcher Button */}
          <ThemeToggle />

          {/* Auth Controls */}
          {user ? (
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800/80 border border-transparent hover:border-neutral-300 dark:hover:border-neutral-700 transition-all text-sm font-medium text-neutral-800 dark:text-neutral-200"
              >
                {user.photoURL ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={user.photoURL}
                    alt={user.displayName || "User avatar"}
                    className="w-7 h-7 rounded-full border border-neutral-300 dark:border-neutral-700"
                  />
                ) : (
                  <div className="w-7 h-7 rounded-full bg-emerald-600 flex items-center justify-center text-xs font-bold text-white uppercase">
                    {(user.displayName || user.email || "U")[0]}
                  </div>
                )}
                <span className="hidden lg:inline text-xs text-neutral-700 dark:text-neutral-300 max-w-[100px] truncate">
                  {user.displayName || user.email?.split("@")[0]}
                </span>
              </button>

              {dropdownOpen && (
                <div
                  className="absolute right-0 mt-2 w-56 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#151817] shadow-lg py-2 z-50 text-xs"
                  onClick={() => setDropdownOpen(false)}
                >
                  <div className="px-3 py-2 border-b border-neutral-200 dark:border-neutral-800">
                    <p className="font-medium text-neutral-900 dark:text-white truncate">
                      {user.displayName || "User"}
                    </p>
                    <p className="text-neutral-500 dark:text-neutral-400 truncate">{user.email}</p>
                    <span className="inline-block mt-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 font-semibold text-[10px] border border-emerald-500/20">
                      Free Unlimited Plan
                    </span>
                  </div>

                  <button
                    onClick={() => signOutUser()}
                    className="w-full text-left px-3 py-2 text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 flex items-center gap-2 border-t border-neutral-200 dark:border-neutral-800 mt-1"
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
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white transition-colors"
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
