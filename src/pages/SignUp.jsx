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
import ValidateEmail from "../utils/validateEmail";
const breakfastImg = "/src/assets/testo.svg";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordShowed, setIsPasswordShowed] = useState(false);
  const userData = JSON.parse(localStorage.getItem("userData"));

  const navigate = useNavigate();
  const [isPasswordMedium, setIsPasswordMedium] = useState(false);
  const [isPasswordStrong, setIsPasswordStrong] = useState(false);
  const [passMeter, setPassMeter] = useState(false);

  const showPassMeter = () => {
    setPassMeter(true);
    isPassMeterStrong();
  };

  const hidePassMeter = () => {
    if (password.length > 0) {
      setPassMeter(true);
      isPassMeterStrong();
    } else setPassMeter(false);
  };

  const passwordMedium = () => {
    if (
      /[0-9]/.test(password) &&
      /[a-zA-Z]/.test(
        password && password.trim().charAt(0) === password.trim().charAt(0).toUpperCase()
      ) &&
      password.length >= 8
    )
      setIsPasswordMedium(true);
    else setIsPasswordMedium(false);
  };
  const passwordStrong = () => {
    const strongRegex = /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[.,~/<>?;:"'`!@#$%^&*()\[\]{}_+=|\\-])/;
    if (
      strongRegex.test(password) && password.length >= 8 && /^[A-Z]|(\s[A-Z])/.test(password)
        ? password.trim().charAt(0) === password.trim().charAt(0).toUpperCase()
        : ""
    )
      setIsPasswordStrong(true);
    else setIsPasswordStrong(false);
  };

  const isPassMeterStrong = () => {
    if (isPasswordMedium && isPasswordStrong) {
      return <span className="text-green-600">Password is strong</span>;
    } else if (isPasswordMedium) {
      return (
        <span className="text-orange-500 text-[10px] sm:text-xs">
          {/^[A-Z]|(\s[A-Z])/.test(password)
            ? password.trim().charAt(0) === password.trim().charAt(0).toUpperCase()
              ? "Password is medium use symbols for a stronger password"
              : ""
            : "Make sure start with an uppercase"}
        </span>
      );
    } else {
      return <span className={passMeter ? "text-red-500" : "hidden"}>Password is weak</span>;
    }
  };

  async function registUser() {
    try {
      if (name.trim().length === 0 && email.trim().length === 0 && password.trim().length === 0) {
        toast.info("Please fill out all fields", {
          toastId: "toastInfo",
        });
        return;
      } else if (name.trim().length === 0) {
        toast.info("Name is required", {
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
      }

      if (ValidateEmail(email) === true) {
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

        const data = response.data;
        console.log("data", data);

        if (response.status === 201) {
          navigate("/login", { state: { success: "Account created" } });
        }
      }
    } catch (error) {
      console.error("Error:", error.response.data.message);
      toast.error(error.response.data.message, {
        toastId: "toastError",
      });
    }
  }

  useEffect(() => {
    if (userData) {
      navigate("/", {
        state: { info: "You've signed in" },
      });
    }
  });

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

  const letterStartWithUppercase = (type) => {
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
    const passNumAndLetter = /[0-9]/.test(password) && /[a-zA-Z]/.test(password);
    if (type === "style") {
      return passNumAndLetter ? "text-green-500" : "text-gray-500";
    }
    return passNumAndLetter ? faCheck : faXmark;
  };

  return (
    <div className="max-w-[500px] md:max-w-[804px] lg:max-w-full h-screen mx-auto justify-center before:hidden xl:before:block before:content-[''] before:absolute before:w-1/2 before:h-screen before:-z-50 before:bg-login-side before:bg-cover before:bg-no-repeat before:blur-md">
      <div className="grid grid-cols-1 xl:grid-cols-2 mx-auto justify-center items-center w-full max-w-[1440px]">
        <div className="xl:flex ">
          <img
            src={breakfastImg}
            alt="Sign in image"
            className="xl:flex hidden w-full max-w-[700px] h-screen px-20 z-30"
          />
        </div>{" "}
        <div className="p-5 flex flex-col self-center gap-y-5 max-w-[450px] w-full mx-auto h-fit">
          <Link to="/" className="no-underline w-fit">
            <FontAwesomeIcon icon={faChevronLeft} className="mr-1 pt-2" />
            Home
          </Link>
          <div>
            <h2 className="text-2xl font-bold">Sign up for an account</h2>
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
                placeholder="E.g. dadang hawari"
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
                placeholder="Input your email address"
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
                placeholder="Input your password address"
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
                passMeter ? "h-2 mb-3" : "h-0 -mt-2"
              }`}
            >
              <div className="w-full flex justify-between h-full">
                <div className="bg-red-400 w-full rounded-s-md"></div>
                <div className={`${isPasswordMedium && "bg-orange-400"} w-full`}></div>
                <div className={`${isPasswordStrong && "bg-green-400"} w-full rounded-e-md`}></div>
              </div>
              <div className="block">{isPassMeterStrong()}</div>
            </div>
            <div className="text-xs ">
              <p className={letterStartWithUppercase("style")}>
                <FontAwesomeIcon icon={letterStartWithUppercase("icon")} /> Start with an uppercase
                letter
              </p>
              <p className={isMinPassLengthEight("style")}>
                <FontAwesomeIcon icon={isMinPassLengthEight("icon")} /> Minimum password length is 8
                characters
              </p>
              <p className={passWithNumAndLetter("style")}>
                <FontAwesomeIcon icon={passWithNumAndLetter("icon")} /> Combine password with
                numbers and letters
              </p>
            </div>
            <button
              type="button"
              onClick={() => registUser()}
              className="bg-blue-500 text-white w-full h-10 rounded-md block font-medium"
            >
              Sign
            </button>
          </form>
        </div>
        <ToastContainer
          className=""
          position="top-right"
          closeOnClick="true"
          hideProgressBar="true"
          transition={Flip}
          pauseOnFocusLoss="false"
          autoClose="2000"
        />
      </div>
    </div>
  );
}
