import axios from "axios";
import {
  setFoodLists,
  setSearchFoodResults,
  setTotalPages,
  setDetailFood,
  setTrivia,
} from "../reducers/foodReducers";
import { toast } from "react-toastify";
const BASE_URL_TRIVIA = "https://api.spoonacular.com/food/trivia/random";
export const BASE_URL_RECIPE = "https://api.spoonacular.com/recipes/";

export const getTrivia = () => async (dispatch) => {
  try {
    const response = await axios.get(`${BASE_URL_TRIVIA}?apiKey=${import.meta.env.VITE_API_KEY}`);
    dispatch(setTrivia(response?.data?.text));
  } catch (err) {
    if (axios.isAxiosError(err)) {
      alert(err.message);
      return;
    }
    alert(err.message);
  }
};

export const searchFood =
  ({ query, number, currentPage }) =>
  async (dispatch) => {
    try {
      const response = await axios.get(
        `${BASE_URL_RECIPE}complexSearch?query=${query}&number=${number}&offset=${currentPage}&addRecipeNutrition=true&apiKey=${
          import.meta.env.VITE_API_KEY
        }`
      );
      if (response.status === 200) {
        dispatch(setSearchFoodResults(response.data));
        dispatch(setFoodLists(response.data.results));
        dispatch(
          setTotalPages(Math.ceil(parseInt(response?.data?.totalResults) / parseInt(number)))
        );
        return false;
      }
    } catch (err) {
      console.log("error fetching data: ", err);
      return true;
    }
  };

export const detailFood = (id) => async (dispatch) => {
  try {
    const response = await axios.get(
      `${BASE_URL_RECIPE + id}/information?includeNutrition=true&apiKey=${
        import.meta.env.VITE_API_KEY
      }`
    );
    if (response.status === 200) {
      dispatch(setDetailFood(response.data));
      return false;
    }
  } catch (error) {
    console.log("Error fetching data", error);
    console.log("message", error.response.data.message);
    toast.info(error.response.data.message);
    return true;
  }
};
