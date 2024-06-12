import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  fetchChat,
  fetchChats,
  subscribeOnChat,
} from "../../5_entities/Chat/Chat";
import { useUserStore } from "../../5_entities/User/UserStore";
import { IChat } from "../../5_entities/Chat/Chat.types";
import { useEffect } from "react";

export const useGetChats = () => {
  const { uid, getUser } = useUserStore();
  return useQuery({
    queryKey: ["chats", uid],
    queryFn: () => fetchChats(getUser()),
  });
};

export const useGetChat = (chatUID: string) => {
  const { uid } = useUserStore();
  const queryClient = useQueryClient();

  useEffect(() => {
    const fetchData = async () => {
      const onChatChange = (chat: IChat) => {
        queryClient.setQueryData(["chat", uid, chatUID], chat);
      };
      return await subscribeOnChat(chatUID || "", onChatChange);
    };
    const unsub = fetchData();

    return () => {
      Promise.resolve(unsub).then((unsub) => {
        unsub();
      });
    };
  }, [chatUID, uid, queryClient]);

  return useQuery({
    queryKey: ["chat", uid, chatUID],
    queryFn: () => fetchChat(chatUID),
  });
};
