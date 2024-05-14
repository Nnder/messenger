import { Box } from "@mui/material";
import { useParams } from "react-router-dom";

export const Chat = () => {
  // const navigate = useNavigate();
  let { id } = useParams();
  return (
    <Box>
      <div>Chat {id}</div>
    </Box>
  );
};
