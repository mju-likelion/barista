import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const isClient = typeof window !== "undefined";

const firebaseConfig = {
  apiKey: isClient ? window.ENV.FIREBASE_API_KEY : process.env.FIREBASE_API_KEY,
  authDomain: isClient
    ? window.ENV.FIREBASE_AUTH_DOMAIN
    : process.env.FIREBASE_AUTH_DOMAIN,
  projectId: isClient
    ? window.ENV.FIREBASE_PROJECT_ID
    : process.env.FIREBASE_PROJECT_ID,
  storageBucket: isClient
    ? window.ENV.FIREBASE_STORAGE_BUCKET
    : process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: isClient
    ? window.ENV.FIREBASE_MESSAGING_SENDER_ID
    : process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: isClient ? window.ENV.FIREBASE_APP_ID : process.env.FIREBASE_APP_ID,
  measurementId: isClient
    ? window.ENV.FIREBASE_MEASUREMENT_ID
    : process.env.FIREBASE_MEASUREMENT_ID,
};

initializeApp(firebaseConfig);

export const auth = getAuth();
const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  hd: "likelion.org",
});
export const signInWithGoogle = () => signInWithPopup(auth, provider);
