import React, { useEffect } from "react";
import DefaultNav from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faEnvelope, faUser, faUserAlt } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";

export default function Profile() {
  const navigate = useNavigate();
  const userData = useSelector((state) => state?.auth?.userData);
  useEffect(() => {
    console.log(userData);
    if (!userData) {
      navigate("/", {
        state: { info: "Please sign in first to see your profile" },
      });
    }
  }, []);

  const { name, email, createdAt, picture, type } = userData?.data ?? {};

  return (
    <div>
      {userData ? (
        <>
          <DefaultNav />
          <div className="flex flex-col-reverse md:flex-row w-fit md:w-full gap-4 items-center mt-20 max-w-3xl mx-auto justify-between shadow-md py-5 px-7">
            <div className="text-gray-800">
              <p className="font-bold text-3xl mb-3">
                {type?.toUpperCase() ? type?.toUpperCase() : "USER"}
              </p>
              <div className="flex flex-col gap-y-2">
                <div className="flex gap-x-5 items-center">
                  <FontAwesomeIcon icon={faUser} />
                  <p>{name}</p>
                </div>
                <div className="flex gap-x-5 items-center">
                  <FontAwesomeIcon icon={faEnvelope} />
                  <p>{email}</p>
                </div>
                <hr />
                <div className="flex gap-x-5 items-center">
                  <FontAwesomeIcon icon={faCalendar} />
                  <p>
                    Joined on :{" "}
                    {createdAt
                      ? new Date(createdAt).toLocaleDateString("id-ID", {
                          day: "2-digit",
                          month: "long",
                          year: "numeric",
                        })
                      : "-"}
                  </p>
                </div>
              </div>
            </div>
            {picture ? (
              <div>
                <img src={picture?.data?.url} alt={name} className="w-52 h-52 p-5" />
              </div>
            ) : (
              <div className="bg-gray-100 p-5 rounded-md">
                <FontAwesomeIcon icon={faUserAlt} className="w-52 h-52 text-gray-300" />
              </div>
            )}
          </div>
        </>
      ) : (
        ""
      )}
    </div>
  );
}
