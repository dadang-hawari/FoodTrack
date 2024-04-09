import React, { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
  faFire,
  faNotesMedical,
  faSearch,
  faUtensils,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import DefaultNav from "../components/Navbar";
import Footer from "../components/Footer";

export default function FoodTrack() {
  const [query, setQuery] = useState("");
  const [foods, setFoods] = useState([]);
  const [result, setResult] = useState("");

  const [number, setNumber] = useState(24);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const navigate = useNavigate();
  const BASE_URL = "https://api.spoonacular.com/recipes/";

  const searchFood = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}complexSearch?query=${query}&number=${number}&offset=${currentPage}&addRecipeNutrition=true&apiKey=${
          import.meta.env.VITE_API_KEY
        }`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      setResult(response.data);
      setFoods(response.data.results);
      setTotalPages(
        Math.ceil(parseInt(response.data.totalResults) / parseInt(number))
      );
      setIsLoading(false);
    } catch (err) {
      console.log("error fetching data: ", err);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  useEffect(() => {
    searchFood();
  }, [number, currentPage]);

  const handleChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    searchFood();
  };

  useEffect(() => {
    searchFood();
  }, []);

  return (
    <>
      <DefaultNav />

      <div className="pt-24 flex flex-col justify-between h-screen">
        <div className="max-w-8xl w-full mx-auto flex flex-col justify-center items-center gap-8 pb-24 px-5">
          <h2 className="text-3xl">Find your food</h2>
          <form
            onSubmit={handleSubmit}
            className="my-5 relative w-full max-w-[800px]"
          >
            <input
              type="text"
              placeholder="Search food"
              value={query}
              onChange={handleChange}
              className="py-3 indent-6 border border-gray-300 rounded-full outline-none focus:border-blue-400 w-full"
            />
            <button
              type="submit"
              className="bg-blue-400 w-[80px] h-full rounded-e-full absolute right-0 top-0 active:bg-blue-500"
            >
              <FontAwesomeIcon icon={faSearch} className="text-white" />
            </button>
          </form>

          <div className="w-full max-w-[800px]">
            <div className="flex w-full justify-between">
              <div className=" w-40">
                <h2>Show</h2>
                <select
                  onChange={(e) => setNumber(e.target.value)}
                  className="border border-gray-300 focus:border-blue-400 outline-none p-2 mb-2 w-full rounded-md cursor-pointer  "
                >
                  <option selected value="24">
                    24
                  </option>
                  <option value="48">48</option>
                  <option value="96">96</option>
                </select>
              </div>
              <div className="">
                <h2>Page</h2>
                <button
                  className="-ml-3  p-2 active:text-blue-400"
                  onClick={goToPreviousPage}
                >
                  <FontAwesomeIcon icon={faChevronLeft} className="h-5 w-5 " />
                </button>
                <span className="text-xl">{currentPage}</span> /{" "}
                <span className="text-xl">{totalPages}</span>
                <button
                  className="p-2 active:text-blue-400"
                  onClick={goToNextPage}
                >
                  <FontAwesomeIcon icon={faChevronRight} className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>

          <h2 className="text-xl">
            Showing{" "}
            <span className="text-green-400">
              {`${
                result?.totalResults === undefined
                  ? 0
                  : number >= result?.totalResults
                  ? result?.totalResults
                  : number
              }`}
            </span>{" "}
            of{" "}
            <span className="text-red-500 ">
              {result?.totalResults === undefined ? 0 : result?.totalResults}
            </span>{" "}
            Total Results
          </h2>

          <div className=" xl:grid-cols-3 lg:grid-cols-2 grid-cols-1 grid gap-8 pb-2">
            {foods?.map((food) => (
              <div
                key={food?.id}
                className="flex flex-col max-w-[400px] min-w-[280px] max-sm:min-w-[250px] shadow-[0_0_2px_1px_rgb(0,0,0,0.3)] rounded-lg items-center"
              >
                <img
                  src={`${food?.image}`}
                  alt={food?.title}
                  className="rounded-t-md w-full h-auto max-h-[240px] object-cover "
                />
                <div className="p-4">
                  <ul className="flex gap-x-4 justify-center">
                    <li className="border-r border-gray-300 pe-4">
                      <div className="flex gap-x-2 justify-center">
                        <FontAwesomeIcon
                          icon={faNotesMedical}
                          className="h-5 text-red-400"
                        />
                        <span>{food?.healthScore}%</span>
                      </div>
                      <p className="text-center">Health Score</p>
                    </li>
                    <li className="border-r border-gray-300 pe-4">
                      <div className="flex gap-x-2 justify-center">
                        <FontAwesomeIcon
                          icon={faFire}
                          className="h-5 text-orange-400"
                        />
                        <span>
                          {food?.nutrition?.nutrients
                            ?.filter(
                              (nutrient) => nutrient?.name === "Calories"
                            )
                            .map(
                              (nutrient) => `
                  ${parseInt(nutrient?.amount)}
              `
                            )}
                        </span>
                      </div>
                      <p>Calories</p>
                    </li>
                    <li>
                      <div className="flex gap-x-2 justify-center">
                        <FontAwesomeIcon
                          icon={faUtensils}
                          className="h-5 text-yellow-icon"
                        />
                        <span>{food?.servings}</span>
                      </div>
                      <p>Servings</p>
                    </li>
                  </ul>
                </div>
                <h2
                  className="font-medium px-5 text-2xl hover:text-blue-400 transition cursor-pointer"
                  onClick={() => {
                    navigate(`/food-detail/${food?.id}`, {
                      state: {
                        id: food?.id,
                      },
                    });
                  }}
                >
                  {food?.title}
                </h2>
                <p
                  className="p-4"
                  dangerouslySetInnerHTML={{
                    __html: `${food?.summary?.slice(0, 120)} ...`,
                  }}
                />
              </div>
            ))}
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}
