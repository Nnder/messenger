import { Box, Button, TextField, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SendIcon from "@mui/icons-material/Send";
import CloseIcon from "@mui/icons-material/Close";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import { useGetChat } from "../../6_shared/hooks/useGetChats";
import PageLoader from "../../6_shared/UI/Loaders/PageLoader";
import {
  IMessage,
  createMessage,
  updateMessage,
  useGetMessages,
} from "../../5_entities/Message/Message";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useUserStore } from "../../5_entities/User/UserStore";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import { Theme } from "emoji-picker-react";
import { DocumentData, DocumentReference } from "firebase/firestore";
import { Message } from "../../4_features/Message/Message";
import { IUser } from "../../5_entities/User/User.types";
import { useChangeMessageStore } from "../../5_entities/Message/ChangeMessageStore";

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
  const [edit, setEdit] = useState(false);
  const [emojiPanel, setEmojiPanel] = useState(false);
  const navigate = useNavigate();
  let { chatId } = useParams();
  const { data, isFetched } = useGetChat(chatId || "");
  const { uid } = useUserStore();
  const textRef = useRef<HTMLInputElement | null>(null);
  const { removeMsg, setNewMessage, editMessage } = useChangeMessageStore();

  useEffect(() => {
    const unsubEdit = useChangeMessageStore.subscribe(
      (state) => state.editMessage,
      (editMessage: Partial<IMessage>) => {
        console.log(editMessage);
        setEdit(true);
        if (textRef && textRef.current)
          textRef.current.value = editMessage.text || "";
      },
    );

    const unsubNew = useChangeMessageStore.subscribe(
      (state) => state.newMessage,
      (newMessage: Partial<IMessage>) => {
        console.log(newMessage);
        setEdit(false);
        if (textRef && textRef.current) {
          textRef.current.value = "";
          updateMessage(newMessage.uid || "", {
            text: newMessage.text,
            status: "изменено",
          });
        }
      },
    );

    return () => {
      unsubEdit();
      unsubNew();
    };
  }, []);

  const messages = useGetMessages(chatId || "");
  console.log("messages", messages.data);

  console.log("loader data", data);

  const sendMessage = async () => {
    if (uid && chatId) {
      if (!textRef || !textRef.current) {
        toast("Введите сообщение");
        return;
      }

      const messageText = textRef.current.value;

      if (!messageText.trim()) {
        toast("Сообщение не может быть пустым");
        return;
      }

      const params: Partial<
        IMessage<DocumentReference<DocumentData, DocumentData> | string>
      > = {
        text: messageText,
        owner: uid,
        chat: chatId,
        userRead: false,
      };

      try {
        await createMessage(params);
        toast("Сообщение отправлено");
        textRef.current.value = "";
      } catch (error) {
        toast(`Сообщение не отправлено: ${(error as Error).message}`);
      }
    } else {
      toast("Произошла ошибка при отправке сообщения");
    }
  };

  const editNewMessage = async () => {
    if (!textRef || !textRef.current) {
      toast("Введите сообщение");
      return;
    }

    const messageText = textRef.current.value;

    if (!messageText.trim()) {
      toast("Сообщение не может быть пустым");
      return;
    }

    const newMessage = { ...editMessage };
    newMessage.text = messageText;
    setNewMessage(newMessage);
  };

  const emojiHendler = ({ emoji }: EmojiClickData) => {
    if (textRef && textRef.current) textRef.current.value += emoji;
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
          height: "calc(100vh - 56px - 38px)",
        }}
      >
        {messages.data?.map(
          (
            message: IMessage<
              IUser,
              DocumentReference<DocumentData, DocumentData>
            >,
          ) => (
            <Message
              key={message.uid}
              message={message}
              content={message.owner?.uid == uid ? "flex-end" : "flex-start"}
            />
          ),
        )}
      </Box>

      <Box
        sx={{
          position: "absolute",
          bottom: 50,
          right: 0,
        }}
      >
        <EmojiPicker
          onEmojiClick={emojiHendler}
          open={emojiPanel}
          skinTonesDisabled={true}
          previewConfig={{ showPreview: false }}
          theme={Theme.DARK}
          searchDisabled={true}
        />
      </Box>

      <Box>
        {/* <Box sx={{
          display: edit ? 'flex' : 'none'
        }}>
          <Typography>
            123
          </Typography>
        </Box> */}
        <Box
          sx={{
            background: "black",
            display: "flex",
            alignItems: "flex-end",
            width: 1,
          }}
        >
          <TextField
            inputRef={textRef}
            sx={{ flexGrow: 1, "& fieldset": { border: "none" } }}
            size="medium"
            placeholder="Написать сообщение ..."
            multiline={true}
          />
          <Box
            sx={{
              display: edit ? "flex" : "none",
            }}
          >
            <Button
              onClick={() => {
                removeMsg();
                setEdit(false);
                if (textRef && textRef.current) textRef.current.value = "";
              }}
            >
              <CloseIcon sx={{ fontSize: 35 }} />
            </Button>
          </Box>
          <Button onClick={() => setEmojiPanel((prev) => !prev)}>
            <EmojiEmotionsIcon sx={{ fontSize: 35 }} />
          </Button>
          <Button onClick={edit ? editNewMessage : sendMessage}>
            <SendIcon sx={{ fontSize: 35 }} />
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
