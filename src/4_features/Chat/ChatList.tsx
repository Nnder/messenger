import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useUserStore } from "../../5_entities/User/UserStore";
import { fetchChats, subscribeOnChats } from "../../5_entities/Chat/Chat";
import PageLoader from "../../6_shared/UI/Loaders/PageLoader";
import ChatItem from "./ChatItem";
import { Chat } from "../../5_entities/Chat/Chat.types";
import { Box } from "@mui/material";

export const ChatList = () => {
  const { uid, getUser } = useUserStore();
  const queryClient = useQueryClient();

  const { data, isLoading, isFetched } = useQuery({
    queryKey: ["chats", uid],
    queryFn: () => fetchChats(getUser()),
  });

  const onChatsChange = (chats: Chat[]) => {
    queryClient.setQueryData(["chats", uid], () => chats);
  };

  subscribeOnChats(getUser(), onChatsChange);

  if (isFetched && !isLoading) {
    return (
      <>
        {data?.map((chat: Chat) => (
          <ChatItem key={chat.uid} href={`chat/${chat.uid}`} chat={chat} />
        ))}
      </>
    );
  }

  return (
    <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
      <PageLoader />
    </Box>
  );
};
