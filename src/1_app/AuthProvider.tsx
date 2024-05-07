import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../6_shared/firebase/firebase";
import { PropsWithChildren, useEffect } from "react";

export default function AuthProvider({
  children,
  ...props
}: PropsWithChildren) {
  const [user, loading, error] = useAuthState(auth);

  useEffect(() => {
    if (!loading && !user) {
      const origin = window.location.origin;
      if (`${origin}/SignIn` !== window.location.href) {
        //`${origin}/SignUp` !== window.location.href
        //console.log(`${origin}/SignIn` !== window.location.href)
        window.location.href = `${origin}/SignIn`;
      }
    }
  }, [user, loading]);

  return <>{children}</>;
}
