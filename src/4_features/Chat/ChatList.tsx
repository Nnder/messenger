import PageLoader from "../../6_shared/UI/Loaders/PageLoader";
import ChatItem from "./ChatItem";
import { Chat } from "../../5_entities/Chat/Chat.types";
import { Box } from "@mui/material";
import { useGetChats } from "../../6_shared/hooks/useGetChats";

export const ChatList = () => {
  const { data, isLoading, isFetched } = useGetChats();

  if (isFetched && !isLoading) {
    return (
      <>
        {data?.map((chat: Chat) => (
          <ChatItem key={chat.uid} href={`chats/${chat.uid}`} chat={chat} />
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
