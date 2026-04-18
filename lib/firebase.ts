import { initializeApp, getApps, getApp } from "firebase/app";
import {
  getAuth,
  initializeAuth,
  browserLocalPersistence,
  browserPopupRedirectResolver,
  indexedDBLocalPersistence,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

// Initialize Firebase only if not already initialized
export const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

let authInstance: ReturnType<typeof getAuth> | null = null;
try {
  if (firebaseConfig.apiKey) {
    // Use initializeAuth with explicit persistence so reCAPTCHA Enterprise
    // doesn't attempt a lazy init that fails silently in the console.
    authInstance = getApps().length > 1
      ? getAuth(app) // already initialized by a previous initializeAuth call
      : initializeAuth(app, {
          persistence: [indexedDBLocalPersistence, browserLocalPersistence],
          popupRedirectResolver: browserPopupRedirectResolver,
        });
    authInstance.useDeviceLanguage();
  }
} catch (e) {
  // Falls back to getAuth if initializeAuth was already called
  try {
    if (firebaseConfig.apiKey) {
      authInstance = getAuth(app);
      authInstance.useDeviceLanguage();
    }
  } catch (e2) {
    console.warn("Firebase Auth could not be initialized.", e2);
  }
}

export const auth = authInstance;

// Firestore instance — safe to export even if app isn't fully configured
export let db: ReturnType<typeof getFirestore> | null = null;
try {
  if (firebaseConfig.apiKey) {
    db = getFirestore(app);
  }
} catch (e) {
  console.warn("Firestore could not be initialized.", e);
}
