import { Link, useLocation, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import DefaultNav from "../components/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLightbulb } from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";
import { Flip, ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { getTrivia } from "../redux/actions/foodActions";
import { checkLocationState } from "../utils/checkLocationState";

export default function Home() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const trivia = useSelector((state) => state?.food?.trivia);

  useEffect(() => {
    dispatch(getTrivia());
    checkLocationState(location, navigate);
  }, []);

  return (
    <>
      <DefaultNav />
      <div className="pt-24 flex flex-col justify-between h-screen px-5 text-gray-900">
        <div className="absolute top-0 left-0 w-full -z-30 hidden lg:block">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
            <path
              className="fill-blue-400"
              d="M0,0L48,37.3C96,75,192,149,288,192C384,235,480,245,576,213.3C672,181,768,107,864,90.7C960,75,1056,117,1152,154.7C1248,192,1344,224,1392,240L1440,256L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
            ></path>
          </svg>
        </div>
        <div>
          <div className="w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-9 pb-3">
            <div className="desc flex flex-col gap-6 text-gray-900 order-1 md:order-[-1]">
              <b className="text-4xl pt-4">Gain Detail Food Information Anywhere</b>
              <p>
                Discover the world of food like never before. Know details about food anytime,
                anywhere.
                <Link
                  className="block w-fit bg-blue-400 text-white p-2 w no-underline rounded-md mt-5"
                  to="/food-list"
                >
                  Let's get started
                </Link>
              </p>
            </div>
            <div>
              <img
                src="./img/food-hero.jpg"
                width="459"
                height="428"
                className="mx-auto max-md:mb-2 rounded-lg"
                alt="Food"
              />
            </div>
          </div>
          <div className="border border-yellow-icon rounded-xl mt-12 w-full max-w-4xl mx-auto mb-32">
            <div className="flex items-center gap-x-1 border-b border-b-gray-400 p-5">
              <FontAwesomeIcon icon={faLightbulb} className="text-yellow-icon" />
              <h2 className="font-medium">Food Trivia</h2>
            </div>
            <p className="p-5">
              {trivia
                ? trivia
                : "Recognizing that food is more than sustenance—it is an expression of culture, heritage, and creativity."}
            </p>
          </div>
        </div>
        <Footer />
        <ToastContainer
          position="top-right"
          closeOnClick="true"
          hideProgressBar="true"
          transition={Flip}
          pauseOnFocusLoss={true}
          autoClose="1000"
          className="mt-14"
        />
      </div>
    </>
  );
}
