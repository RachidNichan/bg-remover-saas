"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import {
  User as FirebaseUser,
  onAuthStateChanged,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth, googleProvider, isFirebaseConfigured } from "@/lib/firebase";
import {
  getUserProfile,
  initializeUserProfile,
  deductUserCredit,
  addCreditsToUser,
} from "@/lib/firestore";
import { UserProfile } from "@/types";

interface AuthContextType {
  user: FirebaseUser | null | { uid: string; email: string | null; displayName: string | null; photoURL: string | null };
  profile: UserProfile | null;
  loading: boolean;
  isFirebaseConfigured: boolean;
  signInWithGoogle: () => Promise<void>;
  signInWithEmail: (email: string, password: string) => Promise<void>;
  signUpWithEmail: (email: string, password: string) => Promise<void>;
  signOutUser: () => Promise<void>;
  refreshCredits: () => Promise<void>;
  deductCredit: () => Promise<boolean>;
  addCredits: (amount: number) => Promise<void>;
  useDemoAccount: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = "removebg_local_demo_user";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Load profile from Firestore or local storage
  const syncProfile = useCallback(async (currentUser: any) => {
    if (!currentUser) {
      setProfile(null);
      return;
    }

    if (isFirebaseConfigured && auth) {
      try {
        const prof = await initializeUserProfile({
          uid: currentUser.uid,
          email: currentUser.email,
          displayName: currentUser.displayName,
          photoURL: currentUser.photoURL,
        });
        setProfile(prof);
      } catch (err) {
        console.error("Failed to sync profile with Firestore:", err);
      }
    } else {
      // Local demo profile from storage
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        try {
          setProfile(JSON.parse(saved));
        } catch {
          setProfile(createDefaultDemoProfile(currentUser));
        }
      } else {
        const demoProfile = createDefaultDemoProfile(currentUser);
        setProfile(demoProfile);
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(demoProfile));
      }
    }
  }, []);

  function createDefaultDemoProfile(u: any): UserProfile {
    return {
      uid: u.uid || "demo-user-123",
      email: u.email || "demo@removebackgrounds.online",
      displayName: u.displayName || "Demo Creator",
      photoURL: u.photoURL || null,
      credits: 3,
      totalProcessed: 0,
      createdAt: new Date().toISOString(),
    };
  }

  // Firebase Auth State Listener
  useEffect(() => {
    if (isFirebaseConfigured && auth) {
      // Check for redirect result from Google sign-in
      getRedirectResult(auth)
        .then(async (result) => {
          if (result?.user) {
            setUser(result.user);
            await syncProfile(result.user);
          }
        })
        .catch((err) => {
          console.error("Redirect sign-in error:", err);
        });

      const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
        setUser(firebaseUser);
        if (firebaseUser) {
          await syncProfile(firebaseUser);
        } else {
          setProfile(null);
        }
        setLoading(false);
      });

      return () => unsubscribe();
    } else {
      // Check for saved local demo user
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          setUser({
            uid: parsed.uid,
            email: parsed.email,
            displayName: parsed.displayName,
            photoURL: parsed.photoURL,
          });
          setProfile(parsed);
        } catch {
          // ignore
        }
      }
      setLoading(false);
    }
  }, [syncProfile]);

  const signInWithGoogle = async () => {
    if (isFirebaseConfigured && auth && googleProvider) {
      setLoading(true);
      try {
        const result = await signInWithPopup(auth, googleProvider);
        await syncProfile(result.user);
      } catch (err: any) {
        // If popup was blocked by browser, gracefully fallback to redirect
        if (err?.code === "auth/popup-blocked") {
          await signInWithRedirect(auth, googleProvider);
          return;
        }
        // If user intentionally closed popup without completing sign in, ignore silently
        if (err?.code === "auth/popup-closed-by-user" || err?.code === "auth/cancelled-popup-request") {
          return;
        }
        console.error("Google sign-in error:", err);
        throw err;
      } finally {
        setLoading(false);
      }
    } else {
      // Fallback demo sign in
      useDemoAccount();
    }
  };

  const signInWithEmail = async (email: string, password: string) => {
    if (isFirebaseConfigured && auth) {
      setLoading(true);
      try {
        const result = await signInWithEmailAndPassword(auth, email, password);
        await syncProfile(result.user);
      } finally {
        setLoading(false);
      }
    } else {
      // Demo simulated login
      const demoUser = {
        uid: "demo-" + Math.random().toString(36).substring(2, 9),
        email,
        displayName: email.split("@")[0],
        photoURL: null,
      };
      const demoProf = createDefaultDemoProfile(demoUser);
      setUser(demoUser);
      setProfile(demoProf);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(demoProf));
    }
  };

  const signUpWithEmail = async (email: string, password: string) => {
    if (isFirebaseConfigured && auth) {
      setLoading(true);
      try {
        const result = await createUserWithEmailAndPassword(auth, email, password);
        const name = email.split("@")[0];
        await updateProfile(result.user, { displayName: name });
        await syncProfile(result.user);
      } finally {
        setLoading(false);
      }
    } else {
      await signInWithEmail(email, password);
    }
  };

  const signOutUser = async () => {
    if (isFirebaseConfigured && auth) {
      await signOut(auth);
    }
    setUser(null);
    setProfile(null);
    localStorage.removeItem(LOCAL_STORAGE_KEY);
  };

  const useDemoAccount = () => {
    const demoUser = {
      uid: "demo-user-vip",
      email: "creator@removebackgrounds.online",
      displayName: "VIP Creator",
      photoURL: null,
    };
    const demoProf = createDefaultDemoProfile(demoUser);
    setUser(demoUser);
    setProfile(demoProf);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(demoProf));
  };

  const refreshCredits = async () => {
    if (!user) return;
    if (isFirebaseConfigured && auth) {
      const prof = await getUserProfile(user.uid);
      if (prof) setProfile(prof);
    } else {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        setProfile(JSON.parse(saved));
      }
    }
  };

  const deductCredit = async (): Promise<boolean> => {
    if (user && profile) {
      setProfile((prev) =>
        prev
          ? {
              ...prev,
              totalProcessed: (prev.totalProcessed || 0) + 1,
            }
          : null
      );
    }
    return true;
  };

  const addCredits = async (amount: number) => {
    if (!user || !profile) return;

    if (isFirebaseConfigured && auth) {
      const newCredits = await addCreditsToUser(user.uid, amount);
      setProfile((prev) => (prev ? { ...prev, credits: newCredits } : null));
    } else {
      const updated: UserProfile = {
        ...profile,
        credits: profile.credits + amount,
      };
      setProfile(updated);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        loading,
        isFirebaseConfigured,
        signInWithGoogle,
        signInWithEmail,
        signUpWithEmail,
        signOutUser,
        refreshCredits,
        deductCredit,
        addCredits,
        useDemoAccount,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
