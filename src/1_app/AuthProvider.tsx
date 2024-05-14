import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../6_shared/firebase/firebase";
import { PropsWithChildren, useEffect } from "react";
import toast from "react-hot-toast";
import { fetchCurrentUser } from "../5_entities/User/User";
import { AuthProviders } from "../5_entities/User/user.types";
import { useUserStore } from "../5_entities/User/UserStore";
import { useNavigate } from "react-router-dom";

export default function AuthProvider({ ...props }: PropsWithChildren) {
  const [user, loading, error] = useAuthState(auth);
  const { setUser } = useUserStore();
  const navigate = useNavigate();

  if (error) toast("Ошибка пользователя");

  useEffect(() => {
    if (!loading && !user) {
      const origin = window.location.origin;
      if (`${origin}/Sign` !== window.location.href) {
        //`${origin}/SignUp` !== window.location.href
        //console.log(`${origin}/SignIn` !== window.location.href)
        // window.location.href = `${origin}/Sign`;
        navigate("/Sign");
      }
    }
    console.log(user);

    if (user && user.email && user.providerData) {
      console.log("Вы авторизованы");
      fetchCurrentUser(
        user?.email,
        user.providerData[0].providerId as AuthProviders,
      ).then((data) => setUser(data));
    } else {
      console.log("Вы не авторизованы");
    }
  }, [user, loading]);
  return <>{props.children}</>;
}
