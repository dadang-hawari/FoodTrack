import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { NotFound } from "./components/common/NotFound";
import LoginGoogle from "./components/login/GoogleLogin";
import FoodDetail from "./pages/FoodDetail";
import FoodTrack from "./pages/FoodTrack";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import SignUp from "./pages/SignUp";

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
