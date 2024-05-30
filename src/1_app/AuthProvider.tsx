import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../6_shared/firebase/firebase";
import { PropsWithChildren, useEffect } from "react";
import toast from "react-hot-toast";
import { fetchCurrentUser } from "../5_entities/User/User";
import { AuthProviders } from "../5_entities/User/User.types";
import { useUserStore } from "../5_entities/User/UserStore";
import { useQueryClient } from "@tanstack/react-query";
import { IChat } from "../5_entities/Chat/Chat.types";
import { subscribeOnChats } from "../5_entities/Chat/Chat";
import PageLoader from "../6_shared/UI/Loaders/PageLoader";

export default function AuthProvider({ ...props }: PropsWithChildren) {
  const [user, loading, error] = useAuthState(auth);
  const queryClient = useQueryClient();
  const { setUser, getUser } = useUserStore();

  if (error) toast("Ошибка пользователя");

  useEffect(() => {
    if (!loading && !user) {
      const origin = window.location.origin;
      if (`${origin}/Sign` !== window.location.href) {
        window.location.href = `${origin}/Sign`;
      }
    }
    console.log(user);

    if (user && user.email && user.providerData) {
      console.log("Вы авторизованы");
      fetchCurrentUser(
        user?.email,
        user.providerData[0].providerId as AuthProviders,
      ).then((userData) => {
        setUser(userData);

        const user = getUser();

        const onChatsChange = (chats: IChat[]) => {
          queryClient.setQueryData(["chats", user.uid], () => chats);
        };

        subscribeOnChats(user, onChatsChange);
      });
    } else {
      console.log("Вы не авторизованы");
    }
  }, [user, loading]);

  if (loading && !user) {
    console.log("loading");
    return (
      <>
        <PageLoader />
      </>
    );
  }

  return <>{props.children}</>;
}
