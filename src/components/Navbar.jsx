import { faBars, faSpoon, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import React, { useEffect, useState } from "react";
import { IconButton, Collapse } from "@material-tailwind/react";
import { Link } from "react-router-dom";

export default function DefaultNav() {
  const [openNav, setOpenNav] = useState(false);
  const path = window.location.pathname;

  useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  const navList = (
    <ul className="mt-2 mb-4 flex text-center flex-col gap-4 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <li>
        <Link
          className={`${path === "/" ? "font-medium text-blue-600" : ""}`}
          to="/"
        >
          Home
        </Link>
      </li>
      <li>
        <Link
          className={`${
            path === "/food-list" ? "font-medium text-blue-600" : ""
          }`}
          to="/food-list"
        >
          Food List
        </Link>
      </li>
      <li>
        <Link
          to="/login"
          className="text-white bg-blue-500 py-2 min-w-[80px] max-w-[400px] block w--full mx-auto rounded-md"
        >
          Login
        </Link>
      </li>
    </ul>
  );

  return (
    <div className="max-h-[768px] w-full">
      <nav className="block shadow-md backdrop-saturate-200 backdrop-blur-2xl bg-opacity-80 bg-white text-white fixed top-0 z-10 h-max w-full rounded-none py-4 sm:px-6 px-5">
        <div className="flex items-center justify-between text-blue-gray-900">
          <Link to="/" className="no-underline">
            <h1 className="font-bold text-blue-400">
              <FontAwesomeIcon icon={faSpoon} />
              FoodTrack
            </h1>
          </Link>

          <div className="flex items-center gap-4">
            <div className="mr-4 hidden lg:block">{navList}</div>

            <IconButton
              variant="text"
              className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
              ripple={false}
              onClick={() => setOpenNav(!openNav)}
            >
              {openNav ? (
                <FontAwesomeIcon icon={faXmark} className="h-[16px]" />
              ) : (
                <FontAwesomeIcon icon={faBars} className="h-[16px]" />
              )}
            </IconButton>
          </div>
        </div>
        <Collapse open={openNav}>{navList}</Collapse>
      </nav>
    </div>
  );
}
