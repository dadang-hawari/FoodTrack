import {
  faBarsProgress,
  faChevronDown,
  faSpoon,
  faUser,
  faXmarkSquare,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useEffect, useState } from "react";
import { IconButton, Collapse } from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { FacebookLoginClient } from "@greatsumini/react-facebook-login";
export default function DefaultNav() {
  const navigate = useNavigate();
  const path = window.location.pathname;
  const BASE_URL_AUTH_USER = "https://shy-cloud-3319.fly.dev/api/v1/auth/me";
  const [openNav, setOpenNav] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const token = localStorage.getItem("token");
  const dataUser = JSON.parse(localStorage.getItem("userData"));

  const authMe = async () => {
    try {
      const response = await axios.get(`${BASE_URL_AUTH_USER}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      localStorage.setItem("userData", JSON.stringify(response?.data));
      console.log("data auth", response);
    } catch (err) {
      if (err.response.status === 401) {
        localStorage.removeItem("userData");
        localStorage.removeItem("token");
      } else {
      }

      console.log("error fetching auth", err);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("login") === "facebook") {
      const userData = localStorage.getItem("userData");
      const timeNow = Math.floor(Date.now() / 1000);
      if (userData) {
        const userDataObj = JSON.parse(userData);
        console.log("time now", timeNow);
        console.log("user data", userDataObj.data.facebookExpires);

        if (timeNow > userDataObj.data.facebookExpires) {
          localStorage.removeItem("userData");
          localStorage.removeItem("login");
          navigate("/", { state: { info: "Token expired, please sign in" } });
        }
      }
    } else if (localStorage.getItem("token")) {
      authMe();
    }
  }, []); // Pastikan dependencies array kosong jika useEffect hanya perlu dijalankan sekali saat komponen dimount

  useEffect(() => {
    window.addEventListener("resize", () => {
      window.innerWidth >= 960 && setOpenNav(false);
    });
  }, []);

  const handleProfileDropdown = () => {
    setShowProfileDropdown(!showProfileDropdown);
  };

  const navList = (
    <ul
      className={`mt-2 mb-4 flex text-center flex-col gap-4 lg:mb-0 lg:mt-0 transition-all  ${
        openNav ? "h-screen" : "h-fit"
      } lg:flex-row lg:items-center lg:gap-6`}
    >
      <li>
        <Link className={`${path === "/" ? "font-medium text-blue-500" : ""}`} to="/">
          Home
        </Link>
      </li>
      <li>
        <Link
          className={`${path === "/food-list" ? "font-medium text-blue-500" : ""}`}
          to="/food-list"
        >
          Food List
        </Link>
      </li>

      <li className="relative">
        {dataUser ? (
          <div className="relative w-fit mx-auto">
            <div
              className="list-none relative p-2 rounded-md text-black cursor-pointer  bg-white bg-opacity-90"
              onClick={handleProfileDropdown}
            >
              <div className="flex items-center w-fit">
                {dataUser?.data?.picture ? (
                  <div>
                    <img
                      src={dataUser?.data?.picture?.data?.url}
                      alt={dataUser?.data?.name}
                      className="w-[22px] h-[22px] rounded-full"
                    />
                  </div>
                ) : (
                  <span className="bg-gray-300 block w-[22px] h-[22px] rounded-full">
                    <FontAwesomeIcon icon={faUser} className="text-white" />
                  </span>
                )}
                <span className="mx-3">{dataUser?.data?.name}</span>
                <FontAwesomeIcon
                  icon={faChevronDown}
                  className={`transition-transform duration-200 ${
                    showProfileDropdown ? "rotate-180" : "rotate-0"
                  }`}
                />
              </div>
            </div>
            {showProfileDropdown && (
              <div className="absolute bg-white bg-opacity-90 p-5 shadow-md rounded-md w-full top-10 left-0">
                <Link to="/profile">Profile</Link>
                <div
                  className="text-red-400 my-1 cursor-pointer"
                  onClick={() => {
                    localStorage.getItem("token") ? localStorage.removeItem("token") : "";
                    localStorage.removeItem("userData");
                    localStorage.getItem("login") ? localStorage.removeItem("login") : "";
                    localStorage.getItem("img") ? localStorage.removeItem("img") : "";
                    localStorage.getItem("login") === "facebook"
                      ? FacebookLoginClient.logout()
                      : "";
                    navigate("/login", {
                      state: {
                        info: "Logout successfull",
                      },
                    });
                  }}
                >
                  Logout
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="flex gap-8">
            <Link
              to="/login"
              className="text-white bg-blue-500 py-2 min-w-[80px] max-w-[400px] block w--full mx-auto rounded-md"
            >
              Sign in
            </Link>
          </div>
        )}
      </li>
    </ul>
  );

  return (
    <div className="w-full">
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
              className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden text-gray-800"
              ripple={false}
              onClick={() => setOpenNav(!openNav)}
            >
              {openNav ? (
                <FontAwesomeIcon icon={faXmarkSquare} className="h-[16px]" />
              ) : (
                <FontAwesomeIcon icon={faBarsProgress} className="h-[16px]" />
              )}
            </IconButton>
          </div>
        </div>
        <Collapse open={openNav}>{navList}</Collapse>
      </nav>
    </div>
  );
}
