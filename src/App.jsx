import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import FoodDetail from "./pages/FoodDetail";
import FoodTrack from "./pages/FoodTrack";
import Home from "./pages/Home";
import Login from "./pages/Login";
import LoginGoogle from "./pages/GoogleLogin";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";
import GoogleLogins from "./pages/GoogleLogin";

export default function App() {
  const router = createBrowserRouter([
    {
      path: `/login`,
      element: <Login />,
    },
    {
      path: `/profile`,
      element: <Profile />,
    },
    {
      path: `/google-login`,
      element: <LoginGoogle />,
    },
    {
      path: `/sign-up`,
      element: <SignUp />,
    },
    {
      path: `/food-detail/:id`,
      element: <FoodDetail />,
    },
    {
      path: `/food-list`,
      element: <FoodTrack />,
    },
    {
      path: `/`,
      element: <Home />,
    },
  ]);
  return <RouterProvider router={router} />;
}
