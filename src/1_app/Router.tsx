import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainPage from "../2_pages/MainPage";
import NotFount from "../2_pages/Error/NotFount";
import Sign from "../2_pages/Sign/Sign";
import Navbar from "../3_widget/Navbar/Navbar";
import { Chat } from "../2_pages/Chat/Chat";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Navbar />
        <MainPage />
      </>
    ),
    errorElement: <div>Error</div>,
    // loader: true,
    children: [
      {
        path: "friends",
        element: <div>friends</div>,
      },
      {
        path: "chat/:id",
        element: <Chat />,
      },
      {
        path: "settings",
        element: <div>setting</div>,
      },
    ],
  },
  {
    path: "/Sign",
    element: <Sign />,
    errorElement: <div>Error</div>,
  },
  {
    path: "*",
    element: (
      <>
        <Navbar />
        <NotFount />
      </>
    ),
    errorElement: <div>Error</div>,
  },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
