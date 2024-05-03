import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import FoodBaseInformation from "../components/FoodBaseInformation";
import FoodFacts from "../components/FoodFacts";
import FoodDetailInformation from "../components/FoodDetailInformation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import Footer from "../components/Footer";
import DefaultNav from "../components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL_RECIPE, detailFood } from "../redux/actions/foodActions";

export default function FoodDetail() {
  const location = useLocation();
  const urlPathId = window.location.pathname.split("/")[2];
  const id = urlPathId ? urlPathId : location.state.id;
  const dispatch = useDispatch();
  console.log("dispatch :>> ", dispatch(detailFood(id)));
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
    dispatch(detailFood(id));
  }, []);

  return (
    <>
      <DefaultNav />
      <div className="bg-gray-100 flex flex-col justify-between h-screen">
        {/* {isLoading ? (
          <h2 className="text-green-400 text-center pt-44">Waiting data....</h2>
        ) : ( */}
        <div className="max-w-4xl mx-auto bg-white px-5 pt-20 pb-20 ">
          <Link
            to={"/food-list"}
            className="block w-fit text-xl mt-5 decoration-solid no-underline"
          >
            <FontAwesomeIcon icon={faChevronLeft} /> Back
          </Link>
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
        )
        <Footer />
      </div>
    </>
  );
}
