import axios from "axios";
import { setFoodLists, setSearchFoodResults, setTotalPages, setDetailFood, setTrivia } from "../reducers/foodReducers";
const BASE_URL_TRIVIA = "https://api.spoonacular.com/food/trivia/random";
export const BASE_URL_RECIPE = "https://api.spoonacular.com/recipes/";

export const getTrivia = () => async (dispatch) => {
  try {
    const response = await axios.get(`${BASE_URL_TRIVIA}?apiKey=${import.meta.env.VITE_API_KEY}`);
    console.log("response trivia :>> ", response);
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
      console.log("data search food params :>> ", query, number, currentPage);
      const response = await axios.get(`${BASE_URL_RECIPE}complexSearch?query=${query}&number=${number}&offset=${currentPage}&addRecipeNutrition=true&apiKey=${import.meta.env.VITE_API_KEY}`);
      console.log("response :>> ", response);
      dispatch(setSearchFoodResults(response.data));
      dispatch(setFoodLists(response.data.results));
      dispatch(setTotalPages(Math.ceil(parseInt(response?.data?.totalResults) / parseInt(number))));
    } catch (err) {
      console.log("error fetching data: ", err);
    }
  };

export const detailFood = (id) => async (dispatch) => {
  try {
    const response = await axios.get(`${BASE_URL_RECIPE + id}/information?includeNutrition=true&apiKey=${import.meta.env.VITE_API_KEY}`);
    dispatch(setDetailFood(response.data));
  } catch (error) {
    console.log("Error fetching data", error);
  }
};
