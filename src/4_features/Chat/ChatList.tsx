import PageLoader from "../../6_shared/UI/Loaders/PageLoader";
import ChatItem from "./ChatItem";
import { IChat } from "../../5_entities/Chat/Chat.types";
import { Box } from "@mui/material";
import { useGetChats } from "../../6_shared/hooks/useGetChats";
import { useUserStore } from "../../5_entities/User/UserStore";

export const ChatList = () => {
  const { data, isLoading, isFetched } = useGetChats();
  const { uid } = useUserStore();

  if (isFetched && !isLoading) {
    return (
      <>
        {data?.map((chat: IChat) => (
          <ChatItem
            key={chat.uid}
            href={`chats/${chat.uid}`}
            chat={chat}
            chatType={chat?.type}
            userID={uid || ""}
          />
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
