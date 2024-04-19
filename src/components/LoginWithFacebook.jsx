import React from "react";
import FacebookLogin from "@greatsumini/react-facebook-login";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF } from "@fortawesome/free-brands-svg-icons";
import { useNavigate } from "react-router-dom";
export default function LoginWithFacebook() {
  const navigate = useNavigate();
  return (
    <div className="w-full relative">
      <FacebookLogin
        appId="972657137789736"
        className="py-1 bg-[#4267b2] text-white rounded w-full"
        children="Facebook"
        onSuccess={(response) => {
          console.log("Login Success!", response);
          localStorage.setItem("userData", JSON.stringify(response));
        }}
        onFail={(error) => {
          console.log("Login Failed!", error);
          if (error.status === "loginCancelled") {
            toast.info("Login cancelled");
          } else {
            toast.error(error.status);
          }
        }}
        onProfileSuccess={(response) => {
          console.log("Get Profile Success!", response);
          let userData = JSON.parse(localStorage.getItem("userData"));
          console.log("user data ", userData);
          userData = {
            facebookExpires: parseInt(userData?.expiresIn) + Math.floor(Date.now() / 1000),
            ...userData,
            ...response,
          };

          parseInt(userData?.expiresIn) + Math.floor(Date.now() / 1000),
            localStorage.setItem("userData", JSON.stringify({ data: userData }));
          localStorage.setItem("login", "facebook");
          localStorage.setItem("img", JSON.stringify(response?.picture?.data?.url));
          navigate("/", {
            state: { success: "Login successfull" },
          });
        }}
      />
      <FontAwesomeIcon
        icon={faFacebookF}
        className="absolute top-1/2 -translate-y-1/2 left-2 h-5 w-5 text-white"
      />
    </div>
  );
}
