import { Box, Button, ButtonProps, Typography } from "@mui/material";
import { PropsWithChildren } from "react";
import { NavLink } from "react-router-dom";
import { Chat } from "../../5_entities/Chat/Chat.types";
import dayjs from "dayjs";

export default function ChatItem({
  children,
  href,
  chat,
  ...props
}: PropsWithChildren<ButtonProps & { chat: Chat }>) {
  // const navigate = useNavigate();

  const Unread = "+100";

  const now = dayjs();
  const seconds = dayjs.unix(chat.updatedAt.seconds);
  const date =
    now.unix() - 86400 < seconds.unix()
      ? seconds.format("HH:mm")
      : seconds.format("DD/MM/YYYY");

  return (
    <NavLink to={href || ""}>
      <Button
        // onClick={() => navigate(href || "")}
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
            {/* overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' */}
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
    </NavLink>
  );
}
