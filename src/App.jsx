import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import FoodDetail from "./pages/FoodDetail";
import FoodTrack from "./pages/FoodTrack";
import Home from "./pages/Home";
import Login from "./pages/Login";

export default function App() {
  const router = createBrowserRouter([
    {
      path: `/food-detail/:id`,
      element: <FoodDetail />,
    },
    {
      path: `/login`,
      element: <Login />,
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
