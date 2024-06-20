import { Box, Button, ButtonProps, Typography } from "@mui/material";
import { PropsWithChildren, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IChat } from "../../5_entities/Chat/Chat.types";
import { lastMessageTime } from "../../6_shared/helpers/lastMessageTime";
import { fetchUser } from "../../5_entities/User/User";
import { useNavbarStore } from "../../5_entities/Mobile/MobileStore";

export default function ChatItem({
  children,
  href,
  chat,
  chatType,
  userID,
  ...props
}: PropsWithChildren<
  ButtonProps & { chat: IChat; chatType: string; userID: string }
>) {
  const navigate = useNavigate();
  // const Unread = "+100";
  const date = lastMessageTime(chat.updatedAt.seconds);
  const [username, setUsername] = useState("");
  const { setNavbar } = useNavbarStore();

  let { chatId } = useParams();

  const getUserName = async (chat: IChat) => {
    console.log("chatInfoPersonal", chat.users[0].uid == userID);
    const user =
      // @ts-ignore
      chat.users[0].id == userID
        ? // @ts-ignore
          await fetchUser(chat.users[1].id)
        : // @ts-ignore
          await fetchUser(chat.users[0].id);
    return user.username;
  };

  useEffect(() => {
    if (chatType == "personal")
      getUserName(chat).then((username) => setUsername(username));
  }, [userID]);

  return (
    <Button
      onClick={() => {
        setNavbar(false);
        navigate("/");
        navigate(href || "");
      }}
      variant="contained"
      sx={{
        width: 1,
        borderRadius: 0,
        px: 1,
        background: chatId && chatId === chat.uid ? "#000000" : "inherit",
      }}
      {...props}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "start",
          alignItems: "start",
          flexDirection: "column",
          width: 1,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "start",
            flexDirection: "row",
            width: 1,
          }}
        >
          <Typography
            textAlign={"left"}
            sx={{
              textAlign: "left",
              display: "-webkit-box",
              WebkitLineClamp: 1,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              overflowWrap: "anywhere",
            }}
          >
            {chatType == "chat" ? chat.name : username}
          </Typography>

          <Typography sx={{ fontSize: 11 }}>{date}</Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "start",
            flexDirection: "row",
            width: 1,
            mt: 0.2,
          }}
        >
          <Typography
            sx={{
              fontSize: 14,
              color: "gray",
              display: "-webkit-box",
              WebkitLineClamp: 1,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              overflowWrap: "anywhere",
            }}
          >
            {chat.lastMessage}
          </Typography>
          <Typography
            sx={{
              fontSize: 13,
              color: "#fff",
              background: "gray",
              borderRadius: 8,
              px: 0.5,
            }}
          >
            {/* {Unread} */}
          </Typography>
        </Box>

        {children}
      </Box>
    </Button>
  );
}
