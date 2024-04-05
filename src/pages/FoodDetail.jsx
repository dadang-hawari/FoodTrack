import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import FoodBaseInformation from "../components/FoodBaseInformation";
import FoodFacts from "../components/FoodFacts";
import FoodDetailInformation from "../components/FoodDetailInformation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import Footer from "../components/Footer";
import DefaultNav from "../components/Navbar";

export default function FoodDetail() {
  const location = useLocation();
  const id = location.state.id;
  const [detail, setDetail] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const BASE_URL = "https://api.spoonacular.com/recipes/";

  const percentCarbs = parseInt(
    detail?.nutrition?.caloricBreakdown?.percentCarbs
  );
  const percentProtein = parseInt(
    detail?.nutrition?.caloricBreakdown?.percentProtein
  );
  const percentFat = parseInt(detail?.nutrition?.caloricBreakdown?.percentFat);

  const detailMeal = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL + id}/information?includeNutrition=true&apiKey=${
          import.meta.env.VITE_API_KEY
        }`
      );
      setDetail(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log("Error fetching data", error);
    }
  };

  useEffect(() => {
    detailMeal();
  }, []);

  return (
    <>
      <DefaultNav />
      <div className="bg-gray-100 flex flex-col justify-between h-screen">
        {isLoading ? (
          <h2 className="text-green-400 text-center pt-44">Waiting data....</h2>
        ) : (
          <div className="max-w-4xl mx-auto bg-white px-5 pt-20 pb-20 ">
            <Link
              to={"/food-list"}
              className="block w-fit text-xl mt-5 decoration-solid no-underline"
            >
              <FontAwesomeIcon icon={faChevronLeft} /> Back
            </Link>
            <FoodBaseInformation
              title={detail?.title}
              image={detail?.image}
              sourceName={detail?.sourceName}
              sourceUrl={detail?.sourceUrl}
              dishTypes={detail?.dishTypes}
            />

            <FoodFacts
              healthScore={detail?.healthScore}
              nutrition={detail?.nutrition?.nutrients}
              readyInMinutes={detail?.readyInMinutes}
              servings={detail?.servings}
              summary={detail?.summary}
            />

            <FoodDetailInformation
              extendedIngredients={detail?.extendedIngredients}
              imgIngredient={`${
                BASE_URL + detail?.id
              }/ingredientWidget.png?apiKey=${import.meta.env.VITE_API_KEY}`}
              imgEquipment={`${
                BASE_URL + detail?.id
              }/equipmentWidget.png?apiKey=${import.meta.env.VITE_API_KEY}`}
              percentProtein={percentProtein}
              percentCarbs={percentCarbs}
              percentFat={percentFat}
              nutrients={detail?.nutrition?.nutrients}
              instructions={detail?.instructions}
            />
          </div>
        )}

        {!isLoading &&
          !detail &&
          setTimeout(() => {
            return (
              <h2 className="mt-20 text-center text-2xl text-red-400">
                Data Kosong
              </h2>
            );
          }, 4000)}

        <Footer />
      </div>
    </>
  );
}
