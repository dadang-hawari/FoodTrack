import React, { useEffect, useState } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { searchFood } from "../redux/actions/foodActions";
import DefaultNav from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import SkeletonFoodList from "../components/common/SkeletonFoodList";
import Toast from "../components/common/Toast";

export default function FoodTrack() {
  const [query, setQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [number, setNumber] = useState(24);
  const data = useSelector((state) => state?.food);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getSearchFood = () => {
    setIsLoading(true);
    dispatch(searchFood({ query, number, currentPage })).then((result) => {
      result.success ? setIsLoading(true) : setIsLoading(false);
    });
  };

  useEffect(() => {
    getSearchFood();
  }, [number, currentPage]);

  const handleChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    getSearchFood();
    if (data?.totalPages <= 1) setCurrentPage(1);
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const goToNextPage = () => {
    if (currentPage < data?.totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <>
      <DefaultNav />
      <div className="pt-24 flex flex-col justify-between h-screen">
        <div className="max-w-8xl w-full mx-auto flex flex-col justify-center items-center gap-8 pb-24 px-5">
          <h2 className="text-3xl">Find your food</h2>
          <form onSubmit={handleSubmit} className="my-5 relative w-full max-w-[800px]">
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
              <div className="w-40">
                <h2>Show</h2>
                <select
                  defaultValue="24"
                  onChange={(e) => setNumber(e.target.value)}
                  className="border border-gray-300 focus:border-blue-400 outline-none p-2 mb-2 w-full rounded-md cursor-pointer"
                >
                  <option value="24">24</option>
                  <option value="48">48</option>
                  <option value="96">96</option>
                </select>
              </div>
              <div>
                <h2>Page</h2>
                <button className="-ml-3 p-2 active:text-blue-400" onClick={goToPreviousPage}>
                  <FontAwesomeIcon icon={faChevronLeft} className="h-5 w-5" />
                </button>
                <span className="text-xl">{data?.totalPages <= 1 ? 1 : currentPage}</span> /{" "}
                <span className="text-xl">{data?.totalPages <= 1 ? 1 : data?.totalPages}</span>
                <button className="p-2 active:text-blue-400" onClick={goToNextPage}>
                  <FontAwesomeIcon icon={faChevronRight} className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>

          <h2 className="text-xl">
            Showing{" "}
            <span className="text-green-400">{`${
              data?.searchFoodResults?.totalResults === undefined
                ? 0
                : Math.min(number, data?.searchFoodResults?.results.length)
            }`}</span>{" "}
            of{" "}
            <span className="text-red-500 ">
              {data?.searchFoodResults?.totalResults === undefined
                ? 0
                : data?.searchFoodResults?.totalResults}
            </span>{" "}
            Total Results
          </h2>

          {isLoading ? (
            <SkeletonFoodList length={number} />
          ) : (
            <FoodList data={data} navigate={navigate} />
          )}
        </div>
        <Toast autoClose={3000} />
        <Footer />
      </div>
    </>
  );
}

const FoodList = ({ data, navigate }) => (
  <div className="xl:grid-cols-3 lg:grid-cols-2 grid-cols-1 grid gap-8 pb-2">
    {data?.foodLists?.map((food) => (
      <div
        key={food?.id}
        className="flex flex-col max-w-[400px] min-w-[280px] max-sm:min-w-[250px] shadow-[0_0_2px_1px_rgb(0,0,0,0.3)] rounded-lg items-center"
      >
        <img
          src={`${food?.image}`}
          alt={food?.title}
          loading="lazy"
          className="rounded-t-md w-full h-auto max-h-[240px] object-cover "
        />
        <div className="p-4">
          <ul className="flex gap-x-4 justify-center">
            <li className="border-r border-gray-300 pe-4">
              <div className="flex gap-x-2 justify-center">
                <FontAwesomeIcon icon={faNotesMedical} className="h-5 text-red-400" />
                <span>{food?.healthScore}%</span>
              </div>
              <p className="text-center">Health Score</p>
            </li>
            <li className="border-r border-gray-300 pe-4">
              <div className="flex gap-x-2 justify-center">
                <FontAwesomeIcon icon={faFire} className="h-5 text-orange-400" />
                <span>
                  {food?.nutrition?.nutrients
                    ?.filter((nutrient) => nutrient?.name === "Calories")
                    .map((nutrient) => `${parseInt(nutrient?.amount)}`)}
                </span>
              </div>
              <p>Calories</p>
            </li>
            <li>
              <div className="flex gap-x-2 justify-center">
                <FontAwesomeIcon icon={faUtensils} className="h-5 text-yellow-icon" />
                <span>{food?.servings}</span>
              </div>
              <p>Servings</p>
            </li>
          </ul>
        </div>
        <h2
          className="font-medium px-5 text-2xl hover:text-blue-400 transition cursor-pointer"
          onClick={() => navigate(`/food-detail/${food?.id}`, { state: { id: food?.id } })}
        >
          {food?.title}
        </h2>
        <p
          className="p-4"
          dangerouslySetInnerHTML={{ __html: `${food?.summary?.slice(0, 120)} ...` }}
        />
      </div>
    ))}
  </div>
);
