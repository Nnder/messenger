import { Box, Button, Menu, MenuItem, Typography } from "@mui/material";
import { IMessage, deleteMessage } from "../../5_entities/Message/Message";
import { DocumentData, DocumentReference } from "firebase/firestore";
import { IUser } from "../../5_entities/User/User.types";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useState } from "react";
import { useUserStore } from "../../5_entities/User/UserStore";
import { lastMessageDateTime } from "../../6_shared/helpers/lastMessageTime";
import { firebaseDate } from "../../5_entities/Chat/Chat.types";
import { useChangeMessageStore } from "../../5_entities/Message/ChangeMessageStore";

export const Message = ({
  message,
  content,
}: {
  message: IMessage<IUser, DocumentReference<DocumentData, DocumentData>>;
  content: string;
}) => {
  const { uid } = useUserStore();
  const { setEditMessage } = useChangeMessageStore();

  const date = lastMessageDateTime(
    { ...(message.createdAt as firebaseDate) }.seconds,
  );

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleUpdateMsg = (
    message: Partial<
      IMessage<any, DocumentReference<DocumentData, DocumentData>>
    >,
  ) => {
    setEditMessage(message);
    setAnchorEl(null);
  };

  const handleDeleteMsg = (
    message: IMessage<IUser, DocumentReference<DocumentData, DocumentData>>,
  ) => {
    console.log(message);
    deleteMessage(message.uid).then(() => setAnchorEl(null));
  };

  return (
    <Box
      key={message.uid}
      sx={{
        display: "flex",
        alignItems: "flex-start",
        justifyContent: content,
      }}
    >
      <Box
        sx={{
          backgroundColor: "gray",
          borderRadius: 1,
          p: 0.5,
          m: 0.5,
          minWidth: 100,
          maxWidth: "90%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{
              color: "primary.main",
            }}
          >
            {message.owner.username || "Пользователь не найден"}
          </Typography>

          {message.owner.uid === uid && (
            <Box>
              <Button
                onClick={(e) => handleClick(e)}
                id="basic-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
              >
                <MoreHorizIcon
                  sx={{
                    ml: 1,
                  }}
                />
              </Button>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                <MenuItem onClick={() => handleUpdateMsg(message)}>
                  Изменить
                </MenuItem>
                <MenuItem onClick={() => handleDeleteMsg(message)}>
                  Удалить
                </MenuItem>
              </Menu>
            </Box>
          )}
        </Box>

        <Typography
          sx={{
            width: "100%",
            display: "inline-block",
            overflowWrap: "break-word",
            wordBreak: "break-all",
          }}
        >
          {message.text}
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Typography
            sx={{
              mr: 1,
            }}
          >
            {date}
          </Typography>

          <Typography>
            {message.status == "новое" ? "" : message.status}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};
