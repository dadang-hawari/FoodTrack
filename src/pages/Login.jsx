import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { faChevronLeft, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Flip, ToastContainer, toast } from "react-toastify";
import LoginGoogle from "../components/GoogleLogin";
import LoginWithFacebook from "../components/LoginWithFacebook";
import ValidateEmail from "../utils/validateEmail";
import breakfastImg from "/src/assets/breakfast.svg";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordShowed, setIsPasswordShowed] = useState(false);
  const navigate = useNavigate();
  const userData = JSON.parse(localStorage.getItem("userData"));
  const location = useLocation();

  useEffect(() => {
    if (userData) {
      navigate("/", {
        state: { info: "You've signed in" },
      });
    }
    if (location.state) {
      if (location.state.info) {
        toast.info(location.state.info);
      } else if (location.state.success) {
        toast.success(location.state.success);
      }
      navigate(".", { state: false });
    }
  }, []);

  async function loginUser() {
    if (email.trim().length === 0 && password.trim().length === 0) {
      toast.info("Please fill out all fields", {
        toastId: "toastInfo",
      });
      return;
    } else if (email.trim().length === 0) {
      ValidateEmail(email);
      return;
    } else if (password.trim().length === 0) {
      toast.info("Password is required", {
        toastId: "toastInfo",
      });
      return;
    }

    try {
      toast.loading("wait", {
        toastId: "toastWait",
      });

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
        toast.dismiss("toastWait");
        navigate("/", {
          state: {
            success: "Login successful",
          },
        });
      }
    } catch (error) {
      toast.dismiss("toastWait");

      toast.info(
        <div className="" style={{ fontFamily: "Poppins" }}>
          {error.response.data.message}
        </div>,
        {
          toastId: "toast-1",
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
              </label>

              <input
                type="text"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-10 mt-2 rounded-md indent-3 border-gray-400 focus:border-blue-500 border"
              />
            </div>
            <div className="relative">
              <label htmlFor="password" className="font-medium text-base">
                Password
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
              position="top-right"
              closeOnClick="true"
              hideProgressBar="true"
              transition={Flip}
              pauseOnFocusLoss={true}
              autoClose="1000"
              className="text-black"
            />

            <div className="relative text-center after:-z-10 after:content-[''] after:border-[1px] after:absolute after:w-full after:left-1/2 after:top-1/2 after:-translate-x-1/2 after:-translate-y-1/2">
              <p className="bg-white w-fit mx-auto p-2 text-sm">
                Or continue with (no need to sign up)
              </p>
            </div>

            <div className="flex md:flex-row flex-col gap-4">
              <LoginGoogle />
              <LoginWithFacebook />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
