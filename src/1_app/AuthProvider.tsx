import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../6_shared/firebase/firebase";
import { PropsWithChildren, useEffect } from "react";
import toast from "react-hot-toast";
import { fetchCurrentUser, subscribeOnUser } from "../5_entities/User/User";
import { AuthProviders, IUser } from "../5_entities/User/User.types";
import { useUserStore } from "../5_entities/User/UserStore";
import { useQueryClient } from "@tanstack/react-query";
import { IChat } from "../5_entities/Chat/Chat.types";
import { subscribeOnChats } from "../5_entities/Chat/Chat";
import PageLoader from "../6_shared/UI/Loaders/PageLoader";
import { useRequestStore } from "../5_entities/Request/RequestStore";
import {
  IRequestReady,
  subscribeOnRequests,
} from "../5_entities/Request/Request";
import { useFolderStore } from "../5_entities/Folder/Folder";

export default function AuthProvider({ ...props }: PropsWithChildren) {
  const [user, loading, error] = useAuthState(auth);
  const queryClient = useQueryClient();
  const { setUser, getUser } = useUserStore();
  const { setRequests } = useRequestStore();
  const { setChats, setFilterdChats } = useFolderStore();

  if (error) toast("Ошибка пользователя");

  useEffect(() => {
    if (!loading && !user) {
      const origin = window.location.origin;
      if (`${origin}/Sign` !== window.location.href) {
        window.location.href = `${origin}/Sign`;
      }
    }

    if (user && user.email && user.providerData && user.uid) {
      console.log("Вы авторизованы");
      fetchCurrentUser(
        user?.email,
        user.providerData[0].providerId as AuthProviders,
      ).then((userData) => {
        setUser(userData);

        const user = getUser();

        console.log("user", user);

        const onUserChange = (user: IUser) => {
          queryClient.setQueryData(["user", user.uid], () => user);
          setUser(user);
        };

        const unsubUser = subscribeOnUser(user.uid || "", onUserChange);

        const onChatsChange = (chats: IChat[]) => {
          queryClient.setQueryData(["chats", user.uid], () => chats);
          setChats(chats);
          setFilterdChats();
        };

        const unsubChats = subscribeOnChats(user, onChatsChange);

        const onRequestChange = (request: IRequestReady[]) => {
          queryClient.setQueryData(["requests", user.uid], () => {
            setRequests(request);
            return request;
          });
        };

        const unsubRequests = subscribeOnRequests(
          user?.uid || "",
          onRequestChange,
        );

        return () => {
          unsubUser.then((unsub) => unsub());
          unsubChats.then((unsub) => unsub());
          unsubRequests.then((unsub) => unsub());
        };
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
