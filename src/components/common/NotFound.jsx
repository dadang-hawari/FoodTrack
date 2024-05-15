import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmarkCircle } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

export const NotFound = () => {
  return (
    <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
      <FontAwesomeIcon icon={faXmarkCircle} className="text-red-600 h-40 mb-5" />
      <h1 className="font-medium text-3xl text-gray-800">404 - Page Not Found</h1>
      <Link to={"/"} className="text-2xl  mt-5 block">
        Back to home
      </Link>
    </div>
  );
};
