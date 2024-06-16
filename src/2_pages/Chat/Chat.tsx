import { Box, Button, Tab, TextField, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SendIcon from "@mui/icons-material/Send";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
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
import { ModalWrapper } from "../../4_features/Modal/Modal";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { updateChat } from "../../5_entities/Chat/Chat";
import { IChat } from "../../5_entities/Chat/Chat.types";

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
  const [value, setValue] = useState("0");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    console.log(event);
    setValue(newValue);
  };

  const [userFriends, setUserFriends] = useState<IUser[]>([]);

  const [showChatInfo, setShowChatInfo] = useState(false);
  const [edit, setEdit] = useState(false);
  const [emojiPanel, setEmojiPanel] = useState(false);
  const navigate = useNavigate();
  let { chatId } = useParams();
  const { data, isFetched } = useGetChat(chatId || "");
  const { uid, friends } = useUserStore();
  const textRef = useRef<HTMLInputElement | null>(null);
  const { removeMsg, setNewMessage, editMessage } = useChangeMessageStore();

  const filterUsers = () => {
    const filter: IUser[] = [];
    friends.forEach((friend) => {
      let status = true;
      let length = data?.users?.length ? data?.users?.length : 0;
      for (let i = 0; i < length; i++) {
        if (friend.ref?.id == data?.users[i].ref?.id) {
          status = false;
          break;
        }
      }
      if (status) filter.push(friend);
    });

    return filter;
  };

  useEffect(() => {
    if (friends && data?.users) setUserFriends(filterUsers());
  }, [friends, data?.users]);

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
        status: "новое",
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

  const removeUser = (uid: string) => {
    const users: DocumentReference<DocumentData, DocumentData>[] = [];

    data?.users.map((user) => {
      if (user?.ref?.id != uid && user.ref) users.push(user.ref);
    });

    const params: Partial<IChat> = {
      // @ts-ignore
      users,
    };
    // @ts-ignore
    updateChat(chatId ? chatId : "", params);
  };

  const addUser = (ref: DocumentReference<DocumentData, DocumentData>) => {
    const users: DocumentReference<DocumentData, DocumentData>[] = [];
    data?.users.map((user) => {
      // @ts-ignore
      users.push(user.ref);
    });
    // @ts-ignore
    updateChat(chatId ? chatId : "", { users: [...users, ref] });
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
          <Button onClick={() => data?.type == "chat" && setShowChatInfo(true)}>
            <Typography>{data?.name}</Typography>
          </Button>

          <ModalWrapper
            open={showChatInfo}
            handle={() => setShowChatInfo(false)}
          >
            <Box
              sx={{
                backgroundColor: "primary.main",
                p: 1,
                width: {
                  xs: "90vw",
                  sm: "90vw",
                  md: "600px",
                  lg: "800px",
                  xl: "800px",
                },
                minHeight: 300,
              }}
            >
              <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                  <TabList
                    onChange={handleChange}
                    aria-label="lab API tabs example"
                  >
                    <Tab
                      label="Пользователи"
                      value="0"
                      sx={{
                        color: "secondary.main",
                        "&.Mui-selected": { color: "secondary.main" },
                      }}
                    />
                    <Tab
                      label="Добавить"
                      value="1"
                      sx={{
                        color: "secondary.main",
                        "&.Mui-selected": { color: "secondary.main" },
                      }}
                    />
                  </TabList>
                </Box>
                <TabPanel value="0">
                  {data?.users.map((u, index) => (
                    <Box
                      key={index}
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <Typography>{u.username}</Typography>
                      <Typography>{u.email}</Typography>
                      {data.owner?.id == uid && (
                        <Button
                          onClick={() => removeUser(u?.ref ? u?.ref.id : "")}
                        >
                          <CloseIcon />
                        </Button>
                      )}
                    </Box>
                  ))}
                </TabPanel>
                <TabPanel value="1">
                  {userFriends.map((friend, index) => (
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                      key={index}
                    >
                      {friend.username}
                      <Button
                        onClick={() => {
                          if (friend?.ref) addUser(friend?.ref);
                        }}
                      >
                        <AddIcon />
                      </Button>
                    </Box>
                  ))}
                </TabPanel>
              </TabContext>
            </Box>
          </ModalWrapper>
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
