import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import DecksPage from '../components/DecksPage/DecksPage'; // Import Decks page
import CardsPage from '../components/CardsPage/CardsPage'; // Import Cards page
import Layout from './Layout';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <h1>Welcome!</h1>,
      },
      {
        path: "login",
        element: <LoginFormPage />,
      },
      {
        path: "signup",
        element: <SignupFormPage />,
      },
      {
        path: "decks",
        element: <DecksPage />,
      },
      {
        path: "cards",
        element: <CardsPage />,
      },
    ],
  },
]);
