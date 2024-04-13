import {
  faBarChart,
  faBars,
  faBarsProgress,
  faChartArea,
  faChartBar,
  faChartLine,
  faChevronDown,
  faSackXmark,
  faSpoon,
  faUser,
  faXmark,
  faXmarkCircle,
  faXmarkSquare,
  faXmarksLines,
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
  const [showProfileDropdown, setShowProfileDropdown] = useState(false); // State untuk mengontrol dropdown profile
  const navigate = useNavigate();
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
      }
      console.log("data auth", response);
    } catch (err) {
      console.log("error fetching auth", err);
    }
  };

  useEffect(() => {
    authMe();
  }, []);

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

      <li className=" relative">
        {token ? (
          <div className="relative w-fit mx-auto">
            <div
              className="font-medium list-none relative p-2 rounded-md text-black cursor-pointer  bg-white bg-opacity-90"
              onClick={handleProfileDropdown}
            >
              <div className="flex items-center w-fit">
                <span className="bg-gray-300 block w-[22px] h-[22px] rounded-full">
                  <FontAwesomeIcon icon={faUser} className="text-white" />
                </span>
                <span className="mx-3">
                  {JSON.parse(localStorage.getItem("userData"))?.data?.name}
                </span>
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
                    localStorage.removeItem("token");
                    localStorage.removeItem("userData");
                    navigate("/login");
                    googleLogout();
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
