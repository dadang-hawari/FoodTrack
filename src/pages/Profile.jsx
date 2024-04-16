import React, { useEffect, useState } from "react";
import DefaultNav from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendar,
  faEnvelope,
  faHandsAmericanSignLanguageInterpreting,
  faMailBulk,
  faTerminal,
  faUser,
  faUserAlt,
  faUserCheck,
  faVoicemail,
} from "@fortawesome/free-solid-svg-icons";

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
          <div className="flex flex-col-reverse md:flex-row w-fit md:w-full gap-4 items-center mt-20 max-w-3xl mx-auto justify-between shadow-md py-5 px-7">
            <div className="text-gray-800">
              <p className="font-bold text-3xl mb-3">
                {userData?.data?.type?.toUpperCase() ? userData?.data?.type?.toUpperCase() : "USER"}
              </p>
              <div className="flex flex-col gap-y-2">
                <div className="flex gap-x-5 items-center">
                  <FontAwesomeIcon icon={faUser} />
                  <p>{userData?.data?.name}</p>
                </div>
                <div className="flex gap-x-5 items-center">
                  <FontAwesomeIcon icon={faEnvelope} />
                  <p>{userData?.data?.email}</p>
                </div>
                <div className="flex gap-x-5 items-center">
                  <FontAwesomeIcon icon={faCalendar} />
                  <p>{userData?.data?.createdAt?.toLocaleString("id-ID")}</p>
                </div>
              </div>
            </div>
            {userData?.data?.picture ? (
              <div>
                <img
                  src={userData?.data?.picture?.data?.url}
                  alt={userData?.data?.name}
                  className="w-52 h-52 p-5"
                />
              </div>
            ) : (
              <div className="bg-gray-100 p-5 rounded-md">
                <FontAwesomeIcon icon={faUserAlt} className="w-52 h-52 text-gray-300" />
              </div>
            )}
          </div>
        </>
      ) : (
        <ToastContainer />
      )}
    </div>
  );
}
