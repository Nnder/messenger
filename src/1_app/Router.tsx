import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Sign from "../2_pages/Sign/Sign";
import Navbar from "../3_widget/Navbar/Navbar";
import { Chat } from "../2_pages/Chat/Chat";
import MainPage from "../2_pages/MainPage";
import NotFound from "../2_pages/Error/NotFound";
import { Box, Typography } from "@mui/material";

const Root = () => {
  return (
    <>
      <Navbar key={"navbar"} />
      <MainPage />
    </>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <NotFound />,
    caseSensitive: true,
    children: [
      {
        path: "/chats",
        element: (
          <Box>
            <Typography>Выберите чат</Typography>
          </Box>
        ),
      },
      {
        path: "/chats/:chatId",
        element: <Chat />,
      },
    ],
  },
  {
    path: "/chats/:chatId",
    element: (
      <>
        <Navbar key={"navbar"} />
        <Chat />
      </>
    ),
  },
  {
    path: "/Sign",
    element: <Sign />,
    errorElement: <div>Ошибка не удалось загрузить страницу авторизации</div>,
  },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
