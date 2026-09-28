"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { X, Sparkles, Mail, Lock, AlertCircle, ArrowRight, Check } from "lucide-react";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const {
    signInWithGoogle,
    signInWithEmail,
    signUpWithEmail,
    useDemoAccount,
    isFirebaseConfigured,
  } = useAuth();

  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (mode === "signin") {
        await signInWithEmail(email, password);
      } else {
        await signUpWithEmail(email, password);
      }
      onClose();
    } catch (err: any) {
      setError(err?.message || "Authentication failed. Please check credentials.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setError(null);
    setLoading(true);
    try {
      await signInWithGoogle();
      onClose();
    } catch (err: any) {
      setError(err?.message || "Google sign-in was cancelled or failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleQuickDemo = () => {
    useDemoAccount();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="glass-panel w-full max-w-md rounded-3xl p-6 sm:p-8 border border-white/10 shadow-2xl relative bg-slate-950">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-500 to-cyan-500 p-0.5 mx-auto mb-3 shadow-lg shadow-indigo-500/20">
            <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-cyan-400" />
            </div>
          </div>
          <h3 className="text-xl font-bold text-white">
            {mode === "signin" ? "Welcome Back" : "Create Free Account"}
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            {mode === "signin"
              ? "Sign in to access your processed history & account settings"
              : "Create a free account to start removing backgrounds instantly"}
          </p>
        </div>

        {/* Mode Switch Tabs */}
        <div className="flex rounded-xl bg-slate-900 p-1 mb-5 border border-slate-800 text-xs font-semibold">
          <button
            type="button"
            onClick={() => {
              setMode("signin");
              setError(null);
            }}
            className={`flex-1 py-2 rounded-lg transition-all cursor-pointer ${
              mode === "signin"
                ? "bg-indigo-600 text-white shadow-sm"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => {
              setMode("signup");
              setError(null);
            }}
            className={`flex-1 py-2 rounded-lg transition-all cursor-pointer ${
              mode === "signup"
                ? "bg-indigo-600 text-white shadow-sm"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Create Account
          </button>
        </div>

        {/* Firebase Config Notice if using simulated keys */}
        {!isFirebaseConfigured && (
          <div className="mb-4 p-3 rounded-xl bg-cyan-950/40 border border-cyan-500/30 text-cyan-200 text-xs flex flex-col gap-2">
            <div className="flex items-center gap-1.5 font-semibold text-cyan-300">
              <Sparkles className="w-4 h-4" />
              <span>Instant Test Mode Available</span>
            </div>
            <p className="text-[11px] text-cyan-300/80">
              Firebase credentials in .env are in demo mode. You can sign in with one click below or type any credentials:
            </p>
            <button
              type="button"
              onClick={handleQuickDemo}
              className="w-full py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs transition-colors cursor-pointer"
            >
              ⚡ Instant 1-Click Demo Sign-In
            </button>
          </div>
        )}

        {/* Error message */}
        {error && (
          <div className="mb-4 p-3 rounded-xl bg-red-950/60 border border-red-500/30 text-red-200 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Google One-Click Button */}
        <button
          type="button"
          onClick={handleGoogle}
          disabled={loading}
          className="w-full py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-850 border border-slate-700/80 text-white text-xs font-semibold flex items-center justify-center gap-2.5 transition-all cursor-pointer mb-4 hover:border-slate-600"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.65v3.05h3.9c2.28-2.1 3.6-5.2 3.6-9.14z"
            />
            <path
              fill="#34A853"
              d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.9-3.05c-1.08.72-2.45 1.16-4.03 1.16-3.1 0-5.74-2.1-6.68-4.92H1.21v3.15C3.25 21.4 7.35 24 12 24z"
            />
            <path
              fill="#FBBC05"
              d="M5.32 14.28c-.24-.72-.38-1.5-.38-2.28s.14-1.56.38-2.28V6.57H1.21C.44 8.1 0 9.99 0 12s.44 3.9 1.21 5.43l4.11-3.15z"
            />
            <path
              fill="#EA4335"
              d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.35 0 3.25 2.6 1.21 6.57l4.11 3.15c.94-2.82 3.58-4.97 6.68-4.97z"
            />
          </svg>
          <span>Continue with Google</span>
        </button>

        <div className="relative my-4 text-center">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-800" />
          </div>
          <span className="relative px-3 bg-slate-950 text-[11px] text-slate-500 font-medium">
            or with email
          </span>
        </div>

        {/* Email & Password Form */}
        <form onSubmit={handleSubmit} className="space-y-3.5">
          <div>
            <label className="block text-[11px] font-semibold text-slate-300 mb-1">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@domain.com"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700/80 text-white text-xs placeholder:text-slate-600 focus:outline-none focus:border-indigo-500 transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-300 mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700/80 text-white text-xs placeholder:text-slate-600 focus:outline-none focus:border-indigo-500 transition-colors"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg shadow-indigo-600/25 transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
          >
            <span>{mode === "signin" ? "Sign In" : "Create Free Account"}</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <p className="text-[10px] text-center text-slate-500 mt-3 leading-relaxed">
            By continuing, you agree to our{" "}
            <Link
              href="/terms"
              onClick={onClose}
              className="text-slate-400 hover:text-indigo-300 underline"
            >
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link
              href="/privacy"
              onClick={onClose}
              className="text-slate-400 hover:text-indigo-300 underline"
            >
              Privacy Policy
            </Link>
            .
          </p>
        </form>
      </div>
    </div>
  );
}
