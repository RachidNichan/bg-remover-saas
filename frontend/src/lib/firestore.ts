import {
  doc,
  getDoc,
  setDoc,
  runTransaction,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "./firebase";
import { UserProfile } from "@/types";

const DEFAULT_CREDITS = parseInt(
  process.env.NEXT_PUBLIC_DEFAULT_FREE_CREDITS || "3",
  10
);

/**
 * Fetch user profile from Cloud Firestore
 */
export async function getUserProfile(userId: string): Promise<UserProfile | null> {
  if (!db) return null;

  try {
    const userDocRef = doc(db, "users", userId);
    const snap = await getDoc(userDocRef);

    if (snap.exists()) {
      return snap.data() as UserProfile;
    }
    return null;
  } catch (error) {
    console.error("Error fetching user profile from Firestore:", error);
    throw error;
  }
}

/**
 * Initialize or get user profile. If user doesn't exist, assign 3 free credits.
 */
export async function initializeUserProfile(user: {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
}): Promise<UserProfile> {
  if (!db) {
    // Return simulated profile for local fallback
    return {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      credits: DEFAULT_CREDITS,
      totalProcessed: 0,
      createdAt: new Date().toISOString(),
    };
  }

  const userDocRef = doc(db, "users", user.uid);
  const snap = await getDoc(userDocRef);

  if (snap.exists()) {
    return snap.data() as UserProfile;
  }

  // Create new profile with 3 free credits
  const newProfile: UserProfile = {
    uid: user.uid,
    email: user.email,
    displayName: user.displayName,
    photoURL: user.photoURL,
    credits: DEFAULT_CREDITS,
    totalProcessed: 0,
    createdAt: new Date().toISOString(),
  };

  await setDoc(userDocRef, {
    ...newProfile,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });

  return newProfile;
}

/**
 * Atomically deduct 1 credit from user's account before/after image processing
 */
export async function deductUserCredit(
  userId: string
): Promise<{ success: boolean; remainingCredits: number }> {
  if (!db) {
    throw new Error("Firestore instance is not initialized");
  }

  const userDocRef = doc(db, "users", userId);

  return await runTransaction(db, async (transaction) => {
    const userDoc = await transaction.get(userDocRef);

    if (!userDoc.exists()) {
      // First time user document setup
      const initialCredits = DEFAULT_CREDITS - 1;
      transaction.set(userDocRef, {
        uid: userId,
        credits: initialCredits,
        totalProcessed: 1,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
      return { success: true, remainingCredits: initialCredits };
    }

    const currentCredits = userDoc.data()?.credits ?? 0;

    if (currentCredits <= 0) {
      throw new Error("INSUFFICIENT_CREDITS");
    }

    const remainingCredits = currentCredits - 1;
    const totalProcessed = (userDoc.data()?.totalProcessed || 0) + 1;

    transaction.update(userDocRef, {
      credits: remainingCredits,
      totalProcessed: totalProcessed,
      updatedAt: serverTimestamp(),
    });

    return { success: true, remainingCredits };
  });
}

/**
 * Top up or grant credits to a user (used after simulated payment / demo topup)
 */
export async function addCreditsToUser(
  userId: string,
  amount: number
): Promise<number> {
  if (!db) return amount;

  const userDocRef = doc(db, "users", userId);

  return await runTransaction(db, async (transaction) => {
    const userDoc = await transaction.get(userDocRef);
    let currentCredits = DEFAULT_CREDITS;

    if (userDoc.exists()) {
      currentCredits = userDoc.data()?.credits ?? 0;
    }

    const newCredits = currentCredits + amount;
    transaction.set(
      userDocRef,
      {
        credits: newCredits,
        updatedAt: serverTimestamp(),
      },
      { merge: true }
    );

    return newCredits;
  });
}
