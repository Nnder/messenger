import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainPage from "../2_pages/MainPage";
import NotFount from "../2_pages/Error/NotFount";
import SignIn from "../2_pages/Sign/SignIn";
import Navbar from "../3_widget/Navbar/Navbar";

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
        path: "chats",
        element: <div>chats</div>,
      },
      {
        path: "settings",
        element: <div>setting</div>,
      },
    ],
  },
  {
    path: "/SignIn",
    element: <SignIn />,
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
