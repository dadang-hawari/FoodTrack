import {
  faBars,
  faChevronCircleDown,
  faChevronDown,
  faSpoon,
  faUser,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useEffect, useState } from "react";
import { IconButton, Collapse } from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { googleLogout } from "@react-oauth/google";

export default function DefaultNav() {
  const [openNav, setOpenNav] = useState(false);
  const path = window.location.pathname;
  const BASE_URL_AUTH_USER = "https://shy-cloud-3319.fly.dev/api/v1/auth/me";
  const [userData, setUserData] = useState("");
  const [listProfile, setListProfile] = useState(false);
  const navigate = useNavigate();
  // const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  const token = localStorage.getItem("token");

  const authMe = async () => {
    try {
      const response = await axios.get(`${BASE_URL_AUTH_USER}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUserData(response?.data?.data);
      if (response.status === 200) {
        localStorage.setItem("userData", JSON.stringify(response?.data));
        // setIsUserLoggedIn(true);
      }
      console.log("data auth", response);
    } catch (err) {
      console.log("error fetching auth", err);
    }
  };

  useEffect(() => {
    // trivia();
    authMe();
  }, []);

  useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  const navList = (
    <ul className="mt-2 mb-4 flex text-center flex-col gap-4 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <li>
        <Link
          className={`${path === "/" ? "font-medium text-blue-500" : ""}`}
          to="/"
        >
          Home
        </Link>
      </li>
      <li>
        <Link
          className={`${
            path === "/food-list" ? "font-medium text-blue-500" : ""
          }`}
          to="/food-list"
        >
          Food List
        </Link>
      </li>

      <li className="cursor-pointer relative  ">
        {token ? (
          <details className="cursor-pointer relative bg-white bg-opacity-80 shadow-md rounded-md transition-opacity duration-700">
            <summary
              className="font-medium list-none relative p-2 rounded-md"
              onClick={() => setListProfile(!listProfile)}
            >
              <div className="flex items-center">
                <span className="bg-gray-300 block w-[22px] h-[22px] rounded-full">
                  <FontAwesomeIcon icon={faUser} className="text-white" />
                </span>
                <span className="mx-2">
                  {JSON.parse(localStorage.getItem("userData"))?.data?.name}
                </span>
                <FontAwesomeIcon
                  icon={faChevronDown}
                  className={`transition-transform duration-200 ${
                    listProfile ? "rotate-180 " : ""
                  }`}
                />
              </div>
            </summary>
            <div className="absolute bg-white bg-opacity-90 p-5 shadow-md rounded-md w-full">
              <Link to="/profile">Profile</Link>
              <div
                className="text-red-400 my-1"
                onClick={() => {
                  localStorage.removeItem("token");
                  localStorage.removeItem("userData");
                  navigate("/login");
                  googleLogout();
                }}
              >
                Logout
              </div>
            </div>
          </details>
        ) : (
          <div className="flex gap-8">
            <Link
              to="/login"
              className="text-white bg-blue-500 py-2 min-w-[80px] max-w-[400px] block w--full mx-auto rounded-md"
            >
              Login
            </Link>
            <Link
              to="/sign-up"
              className="text-white bg-blue-500 py-2 min-w-[80px] max-w-[400px] block w--full mx-auto rounded-md"
            >
              Daftar
            </Link>
          </div>
        )}
      </li>
    </ul>
  );

  return (
    <div className="max-h-screen w-full">
      <nav className="block shadow-md backdrop-saturate-200 backdrop-blur-2xl bg-opacity-80 bg-white text-white fixed top-0 z-10 h-max w-full rounded-none py-3 sm:px-6 px-5">
        <div className="flex items-center justify-between text-blue-gray-900">
          <Link to="/" className="no-underline">
            <h1 className="font-bold text-blue-400">
              <FontAwesomeIcon icon={faSpoon} />
              FoodTrack
            </h1>
          </Link>

          <div className="flex items-center gap-4">
            <div className="mr-4 hidden lg:block">{navList}</div>

            <IconButton
              variant="text"
              className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
              ripple={false}
              onClick={() => setOpenNav(!openNav)}
            >
              {openNav ? (
                <FontAwesomeIcon icon={faXmark} className="h-[16px]" />
              ) : (
                <FontAwesomeIcon icon={faBars} className="h-[16px]" />
              )}
            </IconButton>
          </div>
        </div>
        <Collapse open={openNav}>{navList}</Collapse>
      </nav>
    </div>
  );
}
