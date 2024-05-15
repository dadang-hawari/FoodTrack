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
    const response = await axios.get(`${BASE_URL_TRIVIA}?apiKey=${import.meta.env.VITE_API_KEY}`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    dispatch(setTrivia(response?.data?.text));
  } catch (err) {
    console.err(err?.response?.data?.message);
  }
};
export const searchFood =
  ({ query, number, currentPage }) =>
  async (dispatch) => {
    try {
      const response = await axios.get(
        `${BASE_URL_RECIPE}complexSearch?query=${query}&number=${number}&offset=${currentPage}&addRecipeNutrition=true&apiKey=${
          import.meta.env.VITE_API_KEY
        }`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      dispatch(setSearchFoodResults(response?.data));
      dispatch(setFoodLists(response?.data?.results));
      dispatch(setTotalPages(Math.ceil(parseInt(response?.data?.totalResults) / parseInt(number))));
      return { success: false };
    } catch (err) {
      toast.info(err?.response?.data?.message);

      return { success: true };
    }
  };

export const detailFood = (id) => async (dispatch) => {
  try {
    const response = await axios.get(
      `${BASE_URL_RECIPE + id}/information?includeNutrition=true&apiKey=${
        import.meta.env.VITE_API_KEY
      }`,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );
    dispatch(setDetailFood(response?.data));
    return { success: false };
  } catch (err) {
    toast.info(err?.response?.data?.message);
    return { success: true };
  }
};
