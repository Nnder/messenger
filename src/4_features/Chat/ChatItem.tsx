import { Box, Button, ButtonProps, Typography } from "@mui/material";
import { PropsWithChildren } from "react";
import { useNavigate } from "react-router-dom";
import { IChat } from "../../5_entities/Chat/Chat.types";
import lastMessageTime from "../../6_shared/helpers/lastMessageTime";

export default function ChatItem({
  children,
  href,
  chat,
  ...props
}: PropsWithChildren<ButtonProps & { chat: IChat }>) {
  const navigate = useNavigate();
  const Unread = "+100";
  const date = lastMessageTime(chat.updatedAt.seconds);

  return (
    <Button
      onClick={() => {
        navigate("/");
        navigate(href || "");
      }}
      variant="contained"
      sx={{ width: 1, borderRadius: 0, px: 1 }}
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
            {chat.name}
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
            {Unread}
          </Typography>
        </Box>

        {children}
      </Box>
    </Button>
  );
}
