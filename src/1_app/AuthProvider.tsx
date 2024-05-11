import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../6_shared/firebase/firebase";
import { PropsWithChildren, useEffect } from "react";
import toast from "react-hot-toast";

export default function AuthProvider({
  children,
  ...props
}: PropsWithChildren) {
  const [user, loading, error] = useAuthState(auth);

  if (error) toast("Ошибка пользователя");

  useEffect(() => {
    if (!loading && !user) {
      const origin = window.location.origin;
      if (`${origin}/Sign` !== window.location.href) {
        //`${origin}/SignUp` !== window.location.href
        //console.log(`${origin}/SignIn` !== window.location.href)
        window.location.href = `${origin}/Sign`;
      }
    }
    console.log(user);

    if (user) {
      console.log("Вы авторизованы");
    } else {
      console.log("Вы не авторизованы");
    }
  }, [user, loading]);

  return <>{children}</>;
}
