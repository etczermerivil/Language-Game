import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import DecksPage from '../components/DecksPage/DecksPage';
import CardsPage from '../components/CardsPage/CardsPage';
import LandingPage from'../components/LandingPage/LandingPage'
import Layout from './Layout';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <LandingPage />,
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
