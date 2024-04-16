import React, { useState, useRef } from "react";
import SpoonIcon from "/src/assets/spoon.svg";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import FacebookLogin from "@greatsumini/react-facebook-login";
import GoogleIcon from "/src/assets/google.svg";

import axios from "axios";
import { faChevronLeft, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate } from "react-router-dom";
import { Flip, ToastContainer, toast } from "react-toastify";
import LoginGoogle from "./GoogleLogin";
import { faFacebook, faFacebookF } from "@fortawesome/free-brands-svg-icons";
const ImgLogin = "/src/assets/login.svg";
const breakfastImg = "/src/assets/testo.svg";
const softBG = "/src/assets/soft-bg.jpg";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordShowed, setIsPasswordShowed] = useState(false);
  const navigate = useNavigate();
  const emailInputRef = useRef(null);
  const passwordInputRef = useRef(null);

  const handleFocusEmail = () => {
    emailInputRef.current.focus();
  };
  const handleFocusPassword = () => {
    passwordInputRef.current.focus();
  };

  async function loginUser() {
    if (emailInputRef.current.value.trim().length === 0) {
      handleFocusEmail();
    } else if (passwordInputRef.current.value.trim().length === 0) {
      handleFocusPassword();
    }

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
      toast.info(
        <div className="" style={{ fontFamily: "Poppins" }}>
          {error.response.data.message}
        </div>,
        {
          toastId: "toast1",
        }
      );

      console.error("error", error);
      //   console.log("Error:", error.response.data.message);
    }
  }

  return (
    <div className="max-w-[500px] md:max-w-[804px] lg:max-w-full h-screen mx-auto justify-center before:hidden xl:before:block before:content-[''] before:absolute before:w-1/2 before:h-screen before:-z-50 before:bg-login-side before:bg-cover before:bg-no-repeat before:blur-md">
      <div className="grid grid-cols-1 xl:grid-cols-2 mx-auto justify-center items-center w-full max-w-[1440px]">
        <div className="xl:flex ">
          <img
            src={breakfastImg}
            alt="Sign in image"
            className="xl:flex hidden w-full max-w-[700px] h-screen px-20 z-30"
          />
          {/* <img
            src={ImgLogin}
            alt="Sign in image"
            className="xl:flex hidden w-full max-w-[700px] h-screen px-20 z-30"
          /> */}
        </div>
        <div className="p-5 flex flex-col self-center gap-y-5 max-w-[400px] w-full mx-auto h-fit">
          <Link to="/" className="no-underline w-fit">
            <FontAwesomeIcon icon={faChevronLeft} className="mr-1 pt-2" />
            Home
          </Link>
          <div>
            <h2 className="text-2xl font-bold">Sign in to your account</h2>
            <h3 className="text-gray-600">
              Don't have an account yet?
              <Link to="/sign-up" className="no-underline ml-1 font-medium text-blue-600">
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
                ref={emailInputRef}
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
                ref={passwordInputRef}
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
              position="top-right"
              closeOnClick="true"
              hideProgressBar="true"
              transition={Flip}
              pauseOnFocusLoss="false"
              autoClose="1000"
            />

            <div className="relative text-center after:-z-10 after:content-[''] after:border-[1px] after:absolute after:w-full after:left-1/2 after:top-1/2 after:-translate-x-1/2 after:-translate-y-1/2">
              <p className="bg-white w-fit mx-auto p-2 text-sm">
                Or continue with (no need to sign up)
              </p>
            </div>

            <div className="flex md:flex-row flex-col gap-4">
              <LoginGoogle />

              <div className="w-full relative">
                <FacebookLogin
                  appId="378815571801265"
                  className="py-1 bg-[#4267b2] text-white rounded w-full"
                  children="Facebook"
                  onSuccess={(response) => {
                    console.log("Login Success!", response);
                  }}
                  onFail={(error) => {
                    console.log("Login Failed!", error);
                  }}
                  onProfileSuccess={(response) => {
                    console.log("Get Profile Success!", response);
                    localStorage.setItem("userData", JSON.stringify({ data: response }));
                  }}
                />
                <FontAwesomeIcon
                  icon={faFacebookF}
                  className="absolute top-1/2 -translate-y-1/2 left-2 h-5 w-5 text-white"
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
