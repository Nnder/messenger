import { createBrowserRouter, RouterProvider, } from "react-router-dom";
import MainPage from "../2_pages/MainPage";

const router = createBrowserRouter([
    {
      path: "/",
      element: <MainPage/>,
      errorElement: <div>Error</div>,
      // loader: <div>...Loading</div>,
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
      ]
    },
    {
      path: "*",
      element: <div>Error 404</div>,
    }
  ]);

export default function Router() {
  return (
    <RouterProvider router={router} />
  )
}
