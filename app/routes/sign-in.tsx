import { useEffect } from "react";
import { fb } from "~/firebase-config";

export default function SignIn() {
  useEffect(() => {
    fb.auth.onAuthStateChanged(async () => {
      await fb.createUserIfNotExist();
      const isAdmin = await fb.checkIsAdmin();
      console.log(isAdmin);
    });
  }, []);

  return (
    <>
      <button onClick={fb.signIn}>Sign In with Google</button>
    </>
  );
}
