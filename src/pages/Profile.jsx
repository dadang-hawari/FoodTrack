import React, { useEffect, useState } from "react";
import DefaultNav from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

export default function Profile() {
  const navigate = useNavigate();
  const userData = JSON.parse(localStorage.getItem("userData"));

  useEffect(() => {
    console.log(userData);
    if (userData === null) {
      navigate("/", {
        state: { info: "Please sign in first to see your profile" },
      });
    }
  });

  return (
    <div>
      {userData ? (
        <>
          <DefaultNav /> <h2>{userData?.data?.type}</h2>
          <h2>Email {userData?.data?.email}</h2>
          <h2>Created at {userData?.data?.createdAt}</h2>
          <h2>Name {userData?.data?.createdAt}</h2>{" "}
        </>
      ) : (
        <ToastContainer />
      )}
    </div>
  );
}
