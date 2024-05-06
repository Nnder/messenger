import { Outlet } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import usePathname from "../6_shared/hooks/usePathname";
import Navbar from "../3_widget/Navbar/Navbar";

export default function MainPage() {
  const path = usePathname();

  // console.log(path);

  if (path === "/") {
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
            <Typography>Выберите чат для начала общения</Typography>
          </Box>
        </Box>
      </>
    );
  }

  return <Outlet />;
}
