import { createBrowserRouter, RouterProvider, } from "react-router-dom";

const router = createBrowserRouter([
    {
      path: "/",
      element: <div>Hello world!</div>,
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
