import { Box, Button, TextField, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SendIcon from "@mui/icons-material/Send";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import { useGetChat } from "../../6_shared/hooks/useGetChats";
import PageLoader from "../../6_shared/UI/Loaders/PageLoader";
import {
  IMessage,
  createMessage,
  useGetMessages,
} from "../../5_entities/Message/Message";
import { useState } from "react";
import toast from "react-hot-toast";
import { useUserStore } from "../../5_entities/User/UserStore";
import EmojiPicker from "emoji-picker-react";
import { Theme } from "emoji-picker-react";
import { DocumentData, DocumentReference } from "firebase/firestore";

// categories={
//           [
//             {
//               category: 'suggested',
//               name: 'Недавно использованные'
//             },
//             {
//               category: 'smileys_people',
//               name: ''
//             }
//           ]
//         }

export const Chat = () => {
  const [text, setText] = useState<string>("");
  const [emojiPanel, setEmojiPanel] = useState(false);
  const navigate = useNavigate();
  let { chatId } = useParams();
  const { data, isFetched } = useGetChat(chatId || "");
  const { uid } = useUserStore();

  const messages = useGetMessages(chatId || "");
  console.log("messages", messages.data);

  console.log("loader data", data);

  const sendMessage = () => {
    if (uid && chatId) {
      const params: Partial<
        IMessage<DocumentReference<DocumentData, DocumentData> | string>
      > = {
        text,
        owner: uid,
        chat: chatId,
        userRead: false,
      };
      createMessage(params)
        .then(() => {
          toast("Сообщение отправлено");
          setText("");
        })
        .catch((e: Error) => {
          toast(`Сообщение не отправлено ${e.message}`);
        });
    }
  };

  if (!isFetched) return;
  <Box>
    <PageLoader />
  </Box>;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          width: 1,
          background: "#000000",
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          borderBottom: "2px solid gray",
        }}
      >
        <Button onClick={() => navigate(-1)}>
          <ArrowBackIcon />
        </Button>
        <Box>
          <Typography>{data?.name}</Typography>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
          overflow: "auto",
          height: "90vh",
        }}
      >
        {messages.data?.map(
          (
            message: IMessage<DocumentReference<DocumentData, DocumentData>>,
          ) => (
            <Box
              key={message.uid}
              sx={{
                display: "flex",
                alignItems: "flex-start",
                justifyContent:
                  message.owner?.id == uid ? "flex-end" : "flex-start",
              }}
            >
              <Box
                sx={{
                  // display: 'flex',
                  // flexDirection: 'column',
                  backgroundColor: "gray",
                  borderRadius: 1,
                  p: 0.5,
                  m: 0.5,
                }}
              >
                <Typography>{message.owner.id || "123"}</Typography>
                <Typography>{message.text}</Typography>
              </Box>
            </Box>
          ),
        )}
      </Box>

      <Box
        sx={{
          position: "absolute",
          bottom: 30,
          right: 0,
        }}
      >
        <EmojiPicker
          open={emojiPanel}
          skinTonesDisabled={true}
          previewConfig={{ showPreview: false }}
          theme={Theme.DARK}
          searchDisabled={true}
        />
      </Box>

      <Box
        sx={{
          background: "black",
          display: "flex",
          alignItems: "flex-end",
          width: 1,
        }}
      >
        <TextField
          sx={{ flexGrow: 1, "& fieldset": { border: "none" } }}
          size="medium"
          placeholder="Написать сообщение ..."
          multiline={true}
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <Button onClick={() => setEmojiPanel((prev) => !prev)}>
          <EmojiEmotionsIcon sx={{ fontSize: 35 }} />
        </Button>
        <Button onClick={sendMessage}>
          <SendIcon sx={{ fontSize: 35 }} />
        </Button>
      </Box>
    </Box>
  );
};
