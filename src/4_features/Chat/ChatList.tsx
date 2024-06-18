import PageLoader from "../../6_shared/UI/Loaders/PageLoader";
import ChatItem from "./ChatItem";
import { IChat } from "../../5_entities/Chat/Chat.types";
import { Box } from "@mui/material";
import { useGetChats } from "../../6_shared/hooks/useGetChats";
import { useUserStore } from "../../5_entities/User/UserStore";
import { useFolderStore } from "../../5_entities/Folder/Folder";
import { useEffect, useState } from "react";

export const ChatList = () => {
  const { isLoading, isFetched } = useGetChats();
  const { uid } = useUserStore();

  const [folderChats, setFolderChats] = useState<IChat[]>([]);

  useEffect(() => {
    const unsubFilterdChats = useFolderStore.subscribe(
      (state) => state.filterdChats,
      (filterdChats: IChat[]) => {
        console.log("filtered chats", filterdChats);
        setFolderChats([...filterdChats]);
      },
    );

    return () => {
      unsubFilterdChats();
    };
  }, []);

  if (isFetched && !isLoading) {
    return (
      <>
        {folderChats?.map((chat: IChat) => (
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
