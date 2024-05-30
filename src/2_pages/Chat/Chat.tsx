import { Box, Button, TextField, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SendIcon from "@mui/icons-material/Send";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";

export const Chat = () => {
  const navigate = useNavigate();
  let { chatId } = useParams();

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
          <Typography>{chatId}</Typography>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
        }}
      >
        <div>Chat {chatId}</div>
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
        />
        <Button>
          <EmojiEmotionsIcon sx={{ fontSize: 35 }} />
        </Button>
        <Button>
          <SendIcon sx={{ fontSize: 35 }} />
        </Button>
      </Box>
    </Box>
  );
};
