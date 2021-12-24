import { User } from "@firebase/auth";
import { useEffect, useState } from "react";
import { auth, signInWithGoogle } from "~/firebase-config";

export default function SignIn() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    auth.onAuthStateChanged(user => {
      setUser(user);
    });
  }, []);

  useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <>
      <button onClick={signInWithGoogle}>Sign In with Google</button>
    </>
  );
}
