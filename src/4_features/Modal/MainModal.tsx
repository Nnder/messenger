import { Box, Button, IconButton, Modal } from "@mui/material";
import { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import logout from "../../6_shared/firebase/SignOut/SignOut";

export default function MainModal() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
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
            <Box>
              <Button onClick={logout}>Выйти</Button>
            </Box>
          </Box>
        </Box>
      </Modal>
    </>
  );
}
