import { Box, Button, IconButton, Modal, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import SettingsIcon from "@mui/icons-material/Settings";
import logout from "../../6_shared/firebase/SignOut/SignOut";
import { ChatForm } from "../Forms/CreateChat";
import { ModalWrapper } from "./Modal";
import { UserSettings } from "../Forms/UserSettings";
import { useRequestStore } from "../../5_entities/Request/RequestStore";
import toast from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import { useUserStore } from "../../5_entities/User/UserStore";
import { IRequestReady, deleteRequest } from "../../5_entities/Request/Request";
import { addUserToChat } from "../../5_entities/Chat/Chat";
import { addToFriend } from "../../5_entities/User/User";

export default function MainModal() {
  const [requestCount, setRequestCount] = useState(0);
  const { uid } = useUserStore();

  const [requestModal, setRequestModal] = useState(false);
  const [userSettingsForm, setUserSettingsForm] = useState(false);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [chatCreate, setChatCreate] = useState(false);
  const handleChatCreateForm = (open: boolean) => setChatCreate(open);

  const query = useQuery<IRequestReady[]>({ queryKey: ["requests", uid] });

  useEffect(() => {
    if (query.isFetched && query?.data) {
      if (query?.data.length > 0 && requestCount < query?.data.length) {
        toast("Новое приглашение");
      }
      setRequestCount(query.data?.length);
    }
  }, [query.data]);

  useEffect(() => {
    const unsubEdit = useRequestStore.subscribe(
      (state) => state.requests,
      (request) => {
        console.log(request.length);
        setRequestCount(request.length);
      },
    );

    return () => unsubEdit();
  }, []);

  const deleteUserRequest = (request: IRequestReady) => {
    deleteRequest(request.uid || "");
  };

  const acceptUserRequest = (request: IRequestReady) => {
    if (request.type == "chat") {
      if (request.to?.ref)
        addUserToChat(
          request.addTo.chat?.uid ? request.addTo.chat?.uid : "",
          request.to?.ref,
        );
      deleteUserRequest(request);
    } else {
      if (request.from?.ref && request.to?.ref) {
        console.log("aaa", request);
        addToFriend(request.from?.ref, request.to?.ref).then(() =>
          deleteUserRequest(request),
        );
      } else {
        toast("Ошибка");
      }
    }
  };

  return (
    <>
      <IconButton
        size="large"
        edge="start"
        color="inherit"
        aria-label="menu"
        sx={{ m: 0.5, width: "20%" }}
        onClick={handleOpen}
      >
        <MenuIcon />
      </IconButton>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            width: { xs: "60vw", sm: "35vw" },
            height: "100vh",
            background: " black",
            p: 4,
          }}
        >
          <Box>
            <Box sx={{ mb: 1 }}>
              <Button
                variant="contained"
                onClick={() => setUserSettingsForm(true)}
              >
                <SettingsIcon />
              </Button>
            </Box>
            <Box sx={{ mb: 1 }}>
              <Button variant="contained" onClick={logout}>
                Выйти
              </Button>
            </Box>
            <Box sx={{ mb: 1 }}>
              <Button
                variant="contained"
                onClick={() => handleChatCreateForm(true)}
              >
                Создать чат
              </Button>
            </Box>
            <Box sx={{ mb: 1 }}>
              <Button
                variant="contained"
                onClick={() => {
                  //@ts-ignore
                  if (query.isFetched && query.data.length > 0)
                    setRequestModal(true);
                  else toast("Приглашений нет");
                }}
              >
                Приглашения {requestCount > 0 ? requestCount : ""}
              </Button>
            </Box>
            <Box>
              <ModalWrapper open={chatCreate} handle={handleChatCreateForm}>
                <ChatForm
                  hide={() => {
                    setChatCreate(false);
                    handleClose();
                  }}
                />
              </ModalWrapper>
            </Box>

            <Box>
              <ModalWrapper open={requestModal} handle={setRequestModal}>
                <Box
                  sx={{
                    backgroundColor: "primary.main",
                    minWidth: 200,
                    minHeight: 200,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {query.data && query.data.length
                    ? query.data.map((request) => (
                        <Box
                          key={request.uid}
                          sx={{
                            border: "1px solid gray",
                            borderRadius: 1,
                            p: 1,
                            m: 1,
                          }}
                        >
                          <Typography>
                            {request.type == "chat"
                              ? "Приглашение в чат"
                              : "Запрос в друзья"}
                          </Typography>
                          {request.type == "chat" && (
                            <Typography>
                              Чат: {request.addTo.chat?.name}
                            </Typography>
                          )}
                          <Typography>От: {request.from.email}</Typography>
                          <Box>
                            <Button
                              sx={{ width: "50%" }}
                              onClick={() => acceptUserRequest(request)}
                            >
                              Принять
                            </Button>
                            <Button
                              sx={{ width: "50%" }}
                              onClick={() => deleteUserRequest(request)}
                            >
                              Отклонить
                            </Button>
                          </Box>
                        </Box>
                      ))
                    : "Приглашений нет"}
                </Box>
              </ModalWrapper>
            </Box>

            <Box>
              <ModalWrapper
                open={userSettingsForm}
                handle={(open) => setUserSettingsForm(open)}
              >
                <UserSettings
                  hide={() => {
                    setUserSettingsForm(false);
                    handleClose();
                  }}
                />
              </ModalWrapper>
            </Box>
          </Box>
        </Box>
      </Modal>
    </>
  );
}
