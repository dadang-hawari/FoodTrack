import React from "react";
import { createBrowserRouter, Link, RouterProvider } from "react-router-dom";
import FoodDetail from "./pages/FoodDetail";
import FoodTrack from "./pages/FoodTrack";
import Home from "./pages/Home";
import Login from "./pages/Login";
import LoginGoogle from "./components/GoogleLogin";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmarkCircle } from "@fortawesome/free-solid-svg-icons";

const NotFound = () => {
  return (
    <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
      <FontAwesomeIcon icon={faXmarkCircle} className="text-red-600 h-40 mb-5" />
      <h1 className="font-medium text-3xl text-gray-800">404 - Page Not Found</h1>
      <Link to={"/"} className="text-2xl  mt-5 block">
        Back to home
      </Link>
    </div>
  );
};

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
    {
      path: `/home`,
      element: <Home />,
    },
    {
      path: `*`,
      element: <NotFound />,
    },
  ]);
  return <RouterProvider router={router} />;
}
