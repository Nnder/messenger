import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MainPage from '../2_pages/MainPage';
import NotFount from '../2_pages/Error/NotFount';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainPage />,
    errorElement: <div>Error</div>,
    // loader: true,
    children: [
      {
        path: 'friends',
        element: <div>friends</div>,
      },
      {
        path: 'chats',
        element: <div>chats</div>,
      },
      {
        path: 'settings',
        element: <div>setting</div>,
      },
    ],
  },
  {
    path: '*',
    element: <NotFount />,
  },
]);

export default function Router() {
  return (
    <RouterProvider router={router} />
  );
}
