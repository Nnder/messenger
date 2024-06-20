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
import {
  addUserToChat,
  removeUserFromChat,
  updateChat,
} from "../../5_entities/Chat/Chat";
import { IChat } from "../../5_entities/Chat/Chat.types";
import { IRequest, createRequest } from "../../5_entities/Request/Request";
import { useNavbarStore } from "../../5_entities/Mobile/MobileStore";

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
  const [inChat, setInChat] = useState(false);

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
  const { uid, friends, ref } = useUserStore();
  const textRef = useRef<HTMLInputElement | null>(null);
  const { removeMsg, setNewMessage, editMessage } = useChangeMessageStore();

  const { showNabar, setNavbar } = useNavbarStore();
  const [show, setShow] = useState(showNabar);

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
    if (friends && data?.users && isFetched) {
      setUserFriends(filterUsers());
      const has = data.users.find((user) => {
        return user?.ref?.id === uid;
      });
      setInChat(!!has);
    }
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

    const unsub = useNavbarStore.subscribe(
      (state) => state.showNabar,
      (showNabar: boolean) => {
        setShow(showNabar);
      },
    );

    return () => {
      unsub();
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

  const addUser = (userRef: DocumentReference<DocumentData, DocumentData>) => {
    console.log("chatData", data);
    if (data?.ref && ref) {
      const request: IRequest = {
        type: "chat",
        from: ref,
        to: userRef,
        addTo: {
          chat: data?.ref,
        },
      };
      createRequest(request);
      toast("Запрос отправлен");
    } else {
      toast("Ошибка при добавлении пользователя");
    }

    // const users: DocumentReference<DocumentData, DocumentData>[] = [];
    // data?.users.map((user) => {
    //   // @ts-ignore
    //   users.push(user.ref);
    // });
    // @ts-ignore
    // updateChat(chatId ? chatId : "", { users: [...users, ref] });
  };

  const copyChatLink = async () => {
    await navigator.clipboard.writeText(window.location.href);
    toast("Ссылка скопирована");
  };

  const exitFromChat = () => {
    removeUserFromChat(chatId || "", uid || "");
    setNavbar(true);
    navigate(-1);
    toast("Вы покинули чат");
  };

  const joinToChat = () => {
    if (chatId && ref) addUserToChat(chatId, ref);
  };

  if (!isFetched) return;
  <Box
    sx={{
      display: {
        xs: show ? "none" : "inherit",
        sm: "inherit",
        md: "inherit",
      },
    }}
  >
    <PageLoader />
  </Box>;

  return (
    <Box
      sx={{
        display: {
          xs: show ? "none" : "flex",
          sm: "flex",
          md: "flex",
        },
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
        <Button
          onClick={() => {
            setNavbar(true);
            navigate(-1);
          }}
        >
          <ArrowBackIcon />
        </Button>
        <Box>
          <Button
            onClick={() =>
              data?.type == "chat" && setShowChatInfo(true && inChat)
            }
          >
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
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      flexDirection: "column",
                    }}
                  >
                    <Button
                      onClick={() => copyChatLink()}
                      variant="contained"
                      sx={{
                        width: 1,
                        m: 1,
                        WebkitBoxShadow:
                          "0px 0px 10px 2px rgba(247, 247, 247, 0.2)",
                        MozBoxShadow:
                          "0px 0px 10px 2px rgba(247, 247, 247, 0.2)",
                        boxShadow: "0px 0px 10px 2px rgba(247, 247, 247, 0.2)",
                      }}
                    >
                      Скопировать ссылку приглашение
                    </Button>
                    <Button
                      onClick={() => exitFromChat()}
                      variant="contained"
                      sx={{
                        width: 1,
                        m: 1,
                        WebkitBoxShadow:
                          "0px 0px 10px 2px rgba(236, 19, 19, 0.2)",
                        MozBoxShadow: "0px 0px 10px 2px rgba(236, 19, 19, 0.2)",
                        boxShadow: "0px 0px 10px 2px rgba(236, 19, 19, 0.2)",
                      }}
                    >
                      Выйти из чата
                    </Button>
                  </Box>
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
          {inChat ? (
            <>
              <TextField
                inputRef={textRef}
                sx={{ flexGrow: 1, "& fieldset": { border: "none" } }}
                size="medium"
                placeholder="Сообщение..."
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
            </>
          ) : (
            <Button
              sx={{
                width: 1,
                height: 56,
              }}
              onClick={() => joinToChat()}
            >
              Присоединиться к чату
            </Button>
          )}
        </Box>
      </Box>
    </Box>
  );
};
