import React, { useEffect, useState } from "react";
import SpoonIcon from "/src/assets/spoon.svg";
import axios from "axios";
import {
  faCheck,
  faChevronLeft,
  faEye,
  faEyeSlash,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate } from "react-router-dom";
import { Flip, ToastContainer, toast } from "react-toastify";
import ReactModal from "react-modal";
import { customStyles } from "../styles/customStyles";
const ImgLogin = "/src/assets/login.svg";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordShowed, setIsPasswordShowed] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const [isPasswordMedium, setIsPasswordMedium] = useState(false);
  const [isPasswordStrong, setIsPasswordStrong] = useState(false);
  const [passMeter, setPassMeter] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const showPassMeter = () => {
    setPassMeter(true);
  };

  const hidePassMeter = () => {
    if (password.length > 0) setPassMeter(true);
    else setPassMeter(false);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const passwordMedium = () => {
    if (/[0-9]/.test(password) && /[a-zA-Z]/.test(password) && password.length >= 8)
      setIsPasswordMedium(true);
    else setIsPasswordMedium(false);
  };
  const passwordStrong = () => {
    const strongRegex = /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[.,~/<>?;:"'`!@#$%^&*()\[\]{}_+=|\\-])/;

    if (strongRegex.test(password) && password.length >= 8) setIsPasswordStrong(true);
    else setIsPasswordStrong(false);
  };

  async function registUser() {
    try {
      const response = await axios.post(
        "https://shy-cloud-3319.fly.dev/api/v1/auth/register",
        {
          email: email,
          name: name,
          password: password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = response.data; // Mengambil data dari respons, bukan seluruh respons
      console.log("data", data);

      if (response.status === 201) {
        // navigate("/login");
        toast.success("Account created");
      }
    } catch (error) {
      console.error("Error:", error.response.data.message);
      toast.error("error", error.response.data.message);
    }
  }

  useEffect(() => {
    passwordMedium();
    passwordStrong();
  }, [password]);

  const checkHowStrongPassword = () => {
    if (password.length > 6) setIsPasswordMedium(true);
    else setIsPasswordMedium(false);
  };

  const isMinPassLengthEight = (type) => {
    if (type === "style") {
      return password
        ? password.trim().length >= 8
          ? "text-green-500"
          : "text-gray-500"
        : "text-gray-500";
    } else {
      return password ? (password.trim().length >= 8 ? faCheck : faXmark) : faXmark;
    }
  };

  const getTextStyleBasedOnCase = (type) => {
    if (type === "style") {
      return /^[A-Z]|(\s[A-Z])/.test(password)
        ? password.trim().charAt(0) === password.trim().charAt(0).toUpperCase()
          ? "text-green-500"
          : "text-gray-500"
        : "text-gray-500";
    } else {
      return /^[A-Z]|(\s[A-Z])/.test(password)
        ? password.trim().charAt(0) === password.trim().charAt(0).toUpperCase()
          ? faCheck
          : faXmark
        : faXmark;
    }
  };

  const passWithNumAndLetter = (type) => {
    if (type === "style") {
      return /[0-9]/.test(password) && /[a-zA-Z]/.test(password)
        ? "text-green-500"
        : "text-gray-500";
    } else {
      return /[0-9]/.test(password) && /[a-zA-Z]/.test(password) ? faCheck : faXmark;
    }
  };

  return (
    <div className="max-w-[500px] md:max-w-[804px] lg:max-w-full h-screen mx-auto justify-center">
      <div className="grid grid-cols-1 xl:grid-cols-2 mx-auto justify-center items-center w-full max-w-[1440px]">
        <div className="xl:flex relative">
          <div className="bg-blue-200 absolute  h-full w-full blur-3xl"></div>
          <img
            src={ImgLogin}
            alt="Sign in image"
            className="xl:flex hidden w-full max-w-[700px]  backdrop-blur-md h-screen px-20"
          />
        </div>
        <div className="p-5 flex flex-col self-center gap-y-5 max-w-[500px] w-full mx-auto h-fit">
          <Link to="/" className="no-underline w-fit">
            <FontAwesomeIcon icon={faChevronLeft} className="mr-1 pt-2" />
            Home
          </Link>
          <div>
            <h2 className="text-2xl font-bold">Sign in to your account</h2>
            <h3 className="text-gray-600">
              Already have an account?
              <Link to="/login" className="no-underline ml-1 font-medium text-blue-600">
                Sign in
              </Link>
            </h3>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              registUser();
            }}
            className="flex flex-col w-full gap-y-5"
          >
            <div>
              <label htmlFor="name" className="font-medium text-base">
                Name
                <span className="text-red-400" title="required">
                  *
                </span>
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full h-10 mt-2 rounded-md indent-3 border-gray-400 focus:border-blue-500 border"
              />
            </div>
            <div>
              <label htmlFor="email" className="font-medium text-base">
                Email address
                <span className="text-red-400" title="required">
                  *
                </span>
              </label>

              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-10 mt-2 rounded-md indent-3 border-gray-400 focus:border-blue-500 border"
              />
            </div>
            <div className="relative">
              <label htmlFor="password" className="font-medium text-base">
                Password
                <span className="text-red-400" title="required">
                  *
                </span>
              </label>
              <input
                type={isPasswordShowed ? "text" : "password"}
                id="pasword"
                value={password}
                onFocus={showPassMeter}
                onBlur={hidePassMeter}
                className="w-full h-10 mt-2 rounded-md indent-3 border-gray-400 focus:border-blue-500 border"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />

              <button
                type="button"
                className="absolute bottom-0 right-0 rounded-e-md py-[6px] px-[5px]"
                onClick={() => setIsPasswordShowed(!isPasswordShowed)}
              >
                <FontAwesomeIcon
                  icon={isPasswordShowed ? faEyeSlash : faEye}
                  className="text-gray-500 h-[13px]"
                  width="32"
                  height="32"
                />
              </button>
            </div>

            <div
              className={`text-xs transition-[height] duration-400 rounded-md ${
                passMeter ? "h-2" : "h-0"
              }`}
            >
              <div className="w-full flex justify-between  h-full">
                <div className="bg-red-400 w-full rounded-s-md"></div>
                <div className={`${isPasswordMedium && "bg-orange-400"} w-full`}></div>
                <div className={`${isPasswordStrong && "bg-green-400"} w-full rounded-e-md`}></div>
              </div>
              <p>true</p>
            </div>
            <div className="text-xs ">
              <p className={getTextStyleBasedOnCase("style")}>
                <FontAwesomeIcon icon={getTextStyleBasedOnCase("icon")} /> Use uppercase at first
                word
              </p>
              <p className={isMinPassLengthEight("style")}>
                <FontAwesomeIcon icon={isMinPassLengthEight("icon")} /> Minimum password is 8
              </p>
              <p className={passWithNumAndLetter("style")}>
                <FontAwesomeIcon icon={passWithNumAndLetter("icon")} /> Combine password with number
                and letter
              </p>
            </div>
            <button
              type="button"
              // onClick={openModal}
              onClick={() => registUser()}
              className="bg-blue-500 text-white w-full h-10 rounded-md block font-medium"
            >
              Sign
            </button>
            <ReactModal
              isOpen={isModalOpen}
              onRequestClose={closeModal}
              style={customStyles}
              closeTimeoutMS={200}
            >
              {password}
            </ReactModal>
          </form>
        </div>
        <ToastContainer
          className="mt-14"
          position="top-right"
          closeOnClick="true"
          hideProgressBar="true"
          transition={Flip}
          pauseOnFocusLoss="false"
          autoClose="1000"
        />
      </div>
    </div>
  );
}
