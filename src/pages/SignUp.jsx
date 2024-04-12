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
  const [isPasswordLow, setIsPasswordLow] = useState(true);
  const [isPasswordMedium, setIsPasswordMedium] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
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
    checkHowStrongPassword();
  }, [password]);

  const checkHowStrongPassword = () => {
    if (password.length > 6) setIsPasswordMedium(true);
    else setIsPasswordMedium(false);
  };

  return (
    <div className="max-w-[500px] md:max-w-[804px] lg:max-w-full h-screen mx-auto justify-center">
      <div className="grid grid-cols-1 xl:grid-cols-2 mx-auto justify-center items-center w-full max-w-[1440px]">
        <div className="xl:flex">
          <img
            src={ImgLogin}
            alt="Sign in image"
            className="xl:flex hidden w-full max-w-[700px] bg-blue-200 h-screen px-20"
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
              <Link
                to="/login"
                className="no-underline ml-1 font-medium text-blue-600"
              >
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
                className="w-full h-10 mt-2 rounded-md indent-3 border-gray-400 focus:border-blue-500 border"
                onChange={(e) => setPassword(e.target.value)}
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
              <div className="w-full h-4 flex justify-between absolute -bottom-5 border rounded-md">
                <div
                  className={`${
                    isPasswordLow && "bg-red-400"
                  } w-full rounded-s-md`}
                ></div>
                <div
                  className={`${isPasswordMedium && "bg-orange-400"} w-full`}
                ></div>
                <div className={`bg-green-400 w-full rounded-e-md`}></div>
              </div>
            </div>
            <p
              className={`${
                password.trim()
                  ? password.trim().charAt(0) ===
                    password.trim().charAt(0).toUpperCase()
                    ? "text-green-500"
                    : "text-gray-500"
                  : "text-gray-500"
              }`}
            >
              <FontAwesomeIcon
                icon={
                  password.trim()
                    ? password.trim().charAt(0) ===
                      password.trim().charAt(0).toUpperCase()
                      ? faCheck
                      : faXmark
                    : faXmark
                }
              />{" "}
              Use uppercase at first word
            </p>
            <p
              className={`${
                password
                  ? password.trim().length >= 6
                    ? "text-green-500"
                    : "text-gray-500"
                  : "text-gray-500"
              }`}
            >
              Minimum password is 8
            </p>
            <p
              className={
                /[0-9]/.test(password) && /[a-zA-Z]/.test(password)
                  ? "text-green-500"
                  : "text-gray-500"
              }
            >
              Combine password with number and letter
            </p>

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
