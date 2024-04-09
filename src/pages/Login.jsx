import React, { useState } from "react";
import SpoonIcon from "/src/assets/spoon.svg";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";

import axios from "axios";
import {
  faChevronLeft,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import LoginGoogle from "./GoogleLogin";
const ImgLogin = "/src/assets/login.svg";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordShowed, setIsPasswordShowed] = useState(false);
  const navigate = useNavigate();

  async function loginUser() {
    try {
      const response = await axios.post(
        "https://shy-cloud-3319.fly.dev/api/v1/auth/login",
        {
          email: email,
          password: password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("email", email);

      const data = response.data.data;

      if (response.status === 200) {
        localStorage.setItem("token", data.token);
        navigate("/", {
          state: {
            success: "Login successful",
          },
        });
      }
    } catch (error) {
      toast.error(error.response.data.message, {
        toastId: "toast-1",
      });
      console.error("error", error);
      //   console.log("Error:", error.response.data.message);
    }
  }

  return (
    <div className="max-w-[500px] md:max-w-[804px] lg:max-w-full h-screen mx-auto justify-center before:hidden xl:before:block before:content-[''] before:absolute before:w-1/2 before:h-screen before:-z-50 before:bg-blue-200">
      <div className="grid grid-cols-1 xl:grid-cols-2 mx-auto justify-center items-center w-full max-w-[1440px]">
        <div className="xl:flex">
          <img
            src={ImgLogin}
            alt="Sign in image"
            className="xl:flex hidden w-full max-w-[700px] h-screen px-20"
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
              Don't have an account yet?
              <Link
                to="/sign-up"
                className="no-underline ml-1 font-medium text-blue-600"
              >
                Sign up
              </Link>
            </h3>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              loginUser();
            }}
            className="flex flex-col w-full gap-y-4"
          >
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
              type="submit"
              className="bg-blue-500 text-white w-full h-10 rounded-md block font-medium"
            >
              Sign In
            </button>
            <ToastContainer
              autoClose={1000}
              theme="light"
              className={"text-sm max-w-[275px] right-0 max-sm:max-w-full"}
              position="top-right"
              pauseOnHover={false}
            />

            <div className="relative text-center after:-z-10 after:content-[''] after:border-[1px] after:absolute after:w-full after:left-1/2 after:top-1/2 after:-translate-x-1/2 after:-translate-y-1/2">
              <p className="bg-white w-fit mx-auto p-2 text-sm">
                Or continue with (no need to sign up)
              </p>
            </div>

            <LoginGoogle />
          </form>
        </div>
      </div>
    </div>
  );
}
