import { Box, Typography } from "@mui/material";
import toast from "react-hot-toast";
import { useRouteError } from "react-router-dom";
import Navbar from "../../3_widget/Navbar/Navbar";

export default function NotFound() {
  const error = useRouteError();
  console.error(error);

  toast.error("Ошибка 404");
  return (
    <>
      <Navbar />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "100vh",
        }}
      >
        <Box>
          <Typography>Ошибка 404 чат не найден</Typography>
        </Box>
      </Box>
    </>
  );
}
