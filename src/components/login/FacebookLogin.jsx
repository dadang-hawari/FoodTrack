import React from "react";
import FacebookLogin from "@greatsumini/react-facebook-login";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF } from "@fortawesome/free-brands-svg-icons";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLoginWith, setToken, setUserData } from "../../redux/reducers/authReducers";
import { toast } from "react-toastify";
export default function LoginWithFacebook() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  let userData = useSelector((state) => state?.auth);

  const handleOnSuccess = (response) => {
    const expire = parseInt(response?.expiresIn) + Math.floor(Date.now() / 1000);
    userData = {
      facebookExpire: expire,
      response,
    };
    dispatch(setToken(response?.accessToken));
  };

  const handleOnFail = (error) => {
    if (error.status === "loginCancelled") {
      toast.info("Login cancelled");
    } else {
      toast.error(error.status);
    }
  };

  const handleOnProfileSuccess = (response) => {
    userData = {
      data: {
        ...userData,
        ...response,
      },
    };
    dispatch(setUserData(userData));
    dispatch(setLoginWith("facebook"));
    navigate("/", {
      state: { success: "Login successfull" },
    });
  };

  return (
    <div className="w-full relative">
      <FacebookLogin
        appId="972657137789736"
        className="py-1 bg-[#4267b2] text-white rounded w-full"
        children="Facebook"
        onSuccess={(response) => {
          handleOnSuccess(response);
        }}
        onFail={(error) => {
          handleOnFail(error);
        }}
        onProfileSuccess={(response) => {
          handleOnProfileSuccess(response);
        }}
      />
      <FontAwesomeIcon
        icon={faFacebookF}
        className="absolute top-1/2 -translate-y-1/2 left-2 h-5 w-5 text-white"
      />
    </div>
  );
}
