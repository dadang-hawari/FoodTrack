import React, { useState } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import GoogleIcon from "/src/assets/google.svg";
import { toast } from "react-toastify";

function LoginGoogle() {
  const navigate = useNavigate();
  const login = useGoogleLogin({
    ux_mode: "redirect",
    redirect_uri: "http://localhost:5173/login-google",
    onSuccess: async (codeResponse) => {
      toast.loading("wait");
      console.log("Login success:", codeResponse);

      try {
        const response = await axios.post(
          "https://shy-cloud-3319.fly.dev/api/v1/auth/google",

          {
            access_token: `${codeResponse?.access_token}`,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        localStorage.setItem("token", response.data.data.token);
        console.log("data", response.data);
        navigate("/", {
          state: { success: "Login berhasil" },
        });

        //   if (response.status === 201) {
        //     navigate("/login");
        //   }
      } catch (error) {
        console.error("Error:", error);
        toast.error("error", error);
      }
    },
    onError: (error) => {
      console.error("Login error:", error);
      // Tindakan penanganan error
    },
  });

  async function registUser(token) {
    console.log("1");
  }

  return (
    <button
      onClick={login}
      type="button"
      className="relative border border-gray-300 py-1 w-full text-center rounded-md  font-medium"
    >
      Google
      <img
        src={GoogleIcon}
        alt="Google icon"
        className="absolute top-1/2 -translate-y-1/2 left-5"
      />
    </button>
  );
}

export default LoginGoogle;
