import { RouterProvider, createBrowserRouter } from "react-router-dom";
// import NotFount from "../2_pages/Error/NotFount";
import Sign from "../2_pages/Sign/Sign";
import Navbar from "../3_widget/Navbar/Navbar";
import { Chat } from "../2_pages/Chat/Chat";
import MainPage from "../2_pages/MainPage";
import NotFound from "../2_pages/Error/NotFound";

const Root = () => {
  return (
    <>
      <Navbar />
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
        path: "/chats/:chatId",
        element: <Chat />,
      },
    ],
  },
  {
    path: "/chats/:chatId",
    element: (
      <>
        <Navbar />
        <Chat />
      </>
    ),
  },
  {
    path: "/Sign",
    element: <Sign />,
    errorElement: <div>Error2</div>,
  },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
