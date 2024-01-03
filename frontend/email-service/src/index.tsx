import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Root from './layouts/Root';
import ErrorElement from './layouts/ErrorElement';
import Login from './auth/Login';
import Registration from './auth/Registration';
import Logout from './auth/Logout';
import CreateMessage from './inbox/CreateMessage';
import SentMessages from './inbox/SentMessages';
import MessageDetails from './inbox/MessageDetails';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    errorElement: <ErrorElement></ErrorElement>,
    children: [
      {
        index: true,
        element: <App />
      },
      {
        path: 'login',
        element: <Login></Login>,
      },
      {
        path: 'registration',
        element: <Registration />,
      },
      {
        path: 'logout',
        element: <Logout></Logout>
      },
      {
        path: 'create-message',
        element: <CreateMessage></CreateMessage>
      },
      {
        path: 'sent',
        element: <SentMessages></SentMessages>
      },
      {
        path: 'message/:id',
        element: <MessageDetails></MessageDetails>
      }
    ],
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
