import React, { useState } from "react";
import SpoonIcon from "/src/assets/spoon.svg";
import axios from "axios";
import {
  faChevronLeft,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
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
      }
    } catch (error) {
      console.error("Error:", error.response.data.message);
      toast.error("error", error.response.data.message);
    }
  }

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
            </div>
            <button
              type="button"
              onClick={openModal}
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
              Ini konten react modal
            </ReactModal>
            ;
          </form>
        </div>
      </div>
    </div>
  );
}
