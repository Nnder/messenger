import { Box, Button, IconButton, Modal } from "@mui/material";
import { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import logout from "../../6_shared/firebase/SignOut/SignOut";
import { ChatForm } from "../Forms/CreateChat";
import { ModalWrapper } from "./Modal";

export default function MainModal() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [chatCreate, setChatCreate] = useState(false);
  const handleChatCreateForm = (open: boolean) => setChatCreate(open);

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
          </Box>
        </Box>
      </Modal>
    </>
  );
}
