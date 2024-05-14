import {
  faBarsProgress,
  faChevronDown,
  faQuestionCircle,
  faSpoon,
  faUser,
  faXmarkSquare,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useEffect, useState } from "react";
import { IconButton, Collapse } from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import { FacebookLoginClient } from "@greatsumini/react-facebook-login";
import { useDispatch } from "react-redux";
import { authMe } from "../../redux/actions/authActions";
import { useSelector } from "react-redux";
import { setLoginWith, setToken, setUserData } from "../../redux/reducers/authReducers";
import { toast } from "react-toastify";
import ReactModal from "react-modal";
import { customStyles } from "../../styles/customStyles";
import { faQuestion } from "@fortawesome/free-solid-svg-icons/faQuestion";

export default function DefaultNav() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const path = window.location.pathname;
  const [openNav, setOpenNav] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const dataUser = useSelector((state) => state?.auth);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const checkFacebookExpires = () => {
    if (dataUser?.loginWith === "facebook") {
      const userData = dataUser?.userData?.data;
      const timeNow = Math.floor(Date.now() / 1000);
      if (userData) {
        if (timeNow > userData?.facebookExpire) {
          dispatch(setUserData(null));
          dispatch(setToken(null));
          dispatch(setLoginWith(null));
          toast.info("Token expired, please sign in");
          navigate(path === "/profile" ? "/" : "");
        }
      }
    }
  };

  useEffect(() => {
    dispatch(authMe(navigate, path));
    checkFacebookExpires();
  }, []);

  const confirmLogout = () => {
    openModal();
  };

  const handleLogout = () => {
    dispatch(setToken(null));
    if (dataUser?.loginWith === "facebook") FacebookLoginClient.logout(() => {});
    dispatch(setLoginWith(null));
    dispatch(setUserData(null));
    navigate("/login", {
      state: {
        success: "Logout successfull",
      },
    });
  };

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
        {dataUser.userData ? (
          <div className="relative w-fit mx-auto">
            <div
              className="list-none relative p-2 rounded-md text-black cursor-pointer  bg-white bg-opacity-90"
              onClick={handleProfileDropdown}
            >
              <div className="flex items-center w-fit">
                {dataUser?.userData?.data?.picture ? (
                  <div>
                    <img
                      src={dataUser?.userData?.data?.picture?.data?.url}
                      alt={dataUser?.userData?.data?.name}
                      className="w-[22px] h-[22px] rounded-full"
                    />
                  </div>
                ) : (
                  <span className="bg-gray-300 block w-[22px] h-[22px] rounded-full">
                    <FontAwesomeIcon icon={faUser} className="text-white" />
                  </span>
                )}{" "}
                <span className="mx-3">{dataUser?.userData?.data?.name}</span>
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
                <div className="text-red-400 my-1 cursor-pointer" onClick={confirmLogout}>
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
      <ReactModal isOpen={isModalOpen} onRequestClose={closeModal} style={customStyles}>
        <div className="text-center">
          <FontAwesomeIcon icon={faQuestion} className="h-12 text-red-400" />
          <div>Are you sure you want to logout?</div>
          <div className="flex flex-wrap gap-6 mt-5 justify-center">
            <button
              className="border-gray-500 border text-black p-2 rounded-md"
              onClick={closeModal}
            >
              Cancel
            </button>
            <button className="bg-red-400 text-white p-2 rounded-md" onClick={handleLogout}>
              Confirm
            </button>
          </div>
        </div>
      </ReactModal>
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
