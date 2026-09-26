import { initializeApp, getApps, getApp, cert, App } from "firebase-admin/app";
import { getFirestore, FieldValue } from "firebase-admin/firestore";
import { getAuth } from "firebase-admin/auth";

const projectId = process.env.FIREBASE_PROJECT_ID || process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
let privateKey = process.env.FIREBASE_PRIVATE_KEY;

if (privateKey) {
  // Replace escaped newlines if passed in as a single-line string
  privateKey = privateKey.replace(/\\n/g, "\n");
}

let adminApp: App | null = null;

if (!getApps().length) {
  if (projectId && clientEmail && privateKey) {
    try {
      adminApp = initializeApp({
        credential: cert({
          projectId,
          clientEmail,
          privateKey,
        }),
      });
    } catch (error) {
      console.warn("Firebase Admin SDK failed to initialize with provided credentials:", error);
    }
  } else {
    try {
      adminApp = initializeApp();
    } catch {
      // Ignored in local offline environments
    }
  }
} else {
  adminApp = getApp();
}

export const adminDb = adminApp ? getFirestore(adminApp) : null;
export const adminAuth = adminApp ? getAuth(adminApp) : null;

/**
 * Server-side credit deduction using Firebase Admin SDK
 */
export async function serverDeductUserCredit(userId: string): Promise<{ success: boolean; remainingCredits: number }> {
  if (!adminDb) {
    throw new Error("Firebase Admin Firestore is not initialized");
  }

  const userDocRef = adminDb.collection("users").doc(userId);

  return await adminDb.runTransaction(async (transaction: any) => {
    const userDoc = await transaction.get(userDocRef);

    if (!userDoc.exists) {
      const initialCredits = 2; // Default 3 - 1
      transaction.set(userDocRef, {
        uid: userId,
        credits: initialCredits,
        totalProcessed: 1,
        createdAt: FieldValue.serverTimestamp(),
        updatedAt: FieldValue.serverTimestamp(),
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
      totalProcessed,
      updatedAt: FieldValue.serverTimestamp(),
    });

    return { success: true, remainingCredits };
  });
}
