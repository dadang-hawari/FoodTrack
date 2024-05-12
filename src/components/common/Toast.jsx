import React from "react";
import { Flip, ToastContainer } from "react-toastify";

export default function Toast({ autoClose = 1000 }) {
  return (
    <ToastContainer
      position="top-right"
      closeOnClick="true"
      hideProgressBar="true"
      transition={Flip}
      pauseOnFocusLoss={true}
      autoClose={autoClose}
      className="mt-14"
    />
  );
}
