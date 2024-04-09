import React, { useEffect, useState } from "react";
import DefaultNav from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faUserAlt } from "@fortawesome/free-solid-svg-icons";

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
          <DefaultNav />
          <div className="flex items-center mt-20 max-w-3xl mx-auto justify-between shadow-md p-5 ">
            <div className="">
              <h2 className="font-bold text-3xl mb-3">
                {(userData?.data?.type).toUpperCase()}
              </h2>
              <div className="flex flex-col gap-y-2">
                <h2>Name : {userData?.data?.name}</h2>{" "}
                <h2>Email : {userData?.data?.email}</h2>
                <h2>
                  Joined at :{" "}
                  {(userData?.data?.createdAt).toLocaleString("id-ID")}
                </h2>
              </div>
            </div>
            <div className="bg-gray-100 p-5 rounded-md">
              <FontAwesomeIcon
                icon={faUserAlt}
                className="w-52 h-52 text-gray-300"
              />
            </div>
          </div>
        </>
      ) : (
        <ToastContainer />
      )}
    </div>
  );
}
