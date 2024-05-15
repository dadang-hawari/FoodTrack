import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import FoodBaseInformation from "../components/food-detail/FoodBaseInformation";
import FoodFacts from "../components/food-detail/FoodFacts";
import FoodDetailInformation from "../components/food-detail/FoodDetailInformation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import Footer from "../components/common/Footer";
import DefaultNav from "../components/common/Navbar";
import { useDispatch, useSelector } from "react-redux";

import { BASE_URL_RECIPE, detailFood } from "../redux/actions/foodActions";
import SkeletonFoodDetail from "../components/common/SkeletonFoodDetail";
import Toast from "../components/common/Toast";

export default function FoodDetail() {
  const location = useLocation();
  const urlPathId = window.location.pathname.split("/")[2];
  const id = urlPathId ? urlPathId : location.state.id;
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  const getDetailFood = () => {
    setIsLoading(true);
    dispatch(detailFood(id)).then((result) =>
      result.success ? setIsLoading(true) : setIsLoading(false)
    );
  };

  const {
    title,
    image,
    sourceName,
    sourceUrl,
    dishTypes,
    healthScore,
    nutrition,
    readyInMinutes,
    summary,
    servings,
    instructions,
    extendedIngredients,
  } = useSelector((state) => state?.food?.detailFood);

  const percentCarbs = parseInt(nutrition?.caloricBreakdown?.percentCarbs);
  const percentProtein = parseInt(nutrition?.caloricBreakdown?.percentProtein);
  const percentFat = parseInt(nutrition?.caloricBreakdown?.percentFat);

  useEffect(() => {
    getDetailFood();
  }, []);

  return (
    <>
      <DefaultNav />
      <div className="bg-gray-100 flex flex-col justify-between h-full">
        <div className="max-w-4xl mx-auto w-full bg-white px-5 pt-20 pb-20">
          <Link
            to={"/food-list"}
            className="block w-fit text-xl mt-5 decoration-solid no-underline"
          >
            <FontAwesomeIcon icon={faChevronLeft} /> Back
          </Link>
          {isLoading ? (
            <SkeletonFoodDetail />
          ) : (
            <div>
              <FoodBaseInformation
                title={title}
                image={image}
                sourceName={sourceName}
                sourceUrl={sourceUrl}
                dishTypes={dishTypes}
              />

              <FoodFacts
                healthScore={healthScore}
                nutrition={nutrition?.nutrients}
                readyInMinutes={readyInMinutes}
                servings={servings}
                summary={summary}
              />

              <FoodDetailInformation
                extendedIngredients={extendedIngredients}
                imgIngredient={`${BASE_URL_RECIPE + id}/ingredientWidget.png?apiKey=${
                  import.meta.env.VITE_API_KEY
                }`}
                imgEquipment={`${BASE_URL_RECIPE + id}/equipmentWidget.png?apiKey=${
                  import.meta.env.VITE_API_KEY
                }`}
                percentProtein={percentProtein}
                percentCarbs={percentCarbs}
                percentFat={percentFat}
                nutrients={nutrition?.nutrients}
                instructions={instructions}
              />
            </div>
          )}
        </div>
        <Toast autoClose={3000} />
        <Footer />
      </div>
    </>
  );
}
