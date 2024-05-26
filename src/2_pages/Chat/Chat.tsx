import { Box, Button, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export const Chat = () => {
  const navigate = useNavigate();
  let { chatId } = useParams();

  return (
    <Box>
      <Box
        sx={{
          width: 1,
          background: "#000000",
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        <Button onClick={() => navigate(-1)}>
          <ArrowBackIcon />
        </Button>
        <Box>
          <Typography>Chat name</Typography>
        </Box>
      </Box>
      <div>Chat {chatId}</div>
    </Box>
  );
};
