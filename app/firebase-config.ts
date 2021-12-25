import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import {
  collection,
  CollectionReference,
  doc,
  getDoc,
  getFirestore,
  setDoc,
} from "firebase/firestore";

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

interface FirestoreUser {
  name: string;
  likelionEmail: string;
  isAdmin: boolean;
}

class FB {
  readonly auth;
  readonly db;

  private readonly provider;
  private readonly usersRef;

  constructor() {
    initializeApp(firebaseConfig);
    this.auth = getAuth();
    this.db = getFirestore();

    this.provider = new GoogleAuthProvider();
    this.provider.setCustomParameters({
      hd: "likelion.org",
    });
    this.usersRef = collection(
      this.db,
      "users"
    ) as CollectionReference<FirestoreUser>;
  }

  signIn() {
    return signInWithPopup(this.auth, this.provider);
  }

  async checkUserExist() {
    if (!this.auth.currentUser) {
      throw new Error("Please log in first");
    }
    const userSnap = await getDoc(
      doc(this.usersRef, this.auth.currentUser.uid)
    );
    return userSnap.exists();
  }

  async createCurrentUser() {
    if (!this.auth.currentUser) {
      throw new Error("Please log in first");
    }
    await setDoc(doc(this.usersRef, this.auth.currentUser.uid), {
      name: this.auth.currentUser.displayName || "",
      likelionEmail: this.auth.currentUser.email || "",
      isAdmin: false,
    });
  }

  async createUserIfNotExist() {
    const exist = await this.checkUserExist();
    if (!exist) {
      await this.createCurrentUser();
    }
  }

  async checkIsAdmin() {
    if (!this.auth.currentUser) {
      throw new Error("Please log in first");
    }
    const userSnap = await getDoc<FirestoreUser>(
      doc<FirestoreUser>(this.usersRef, this.auth.currentUser.uid)
    );
    return !!userSnap.data()?.isAdmin;
  }
}

export const fb = new FB();
