import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  trivia: null,
  foodLists: [],
  totalPages: 1,
  searchFoodResults: {},
  detailFood: {},
};

const foodSlicer = createSlice({
  name: "food",
  initialState,
  reducers: {
    setTrivia: (state, action) => {
      state.trivia = action.payload;
    },
    setFoodLists: (state, action) => {
      state.foodLists = action.payload;
    },
    setTotalPages: (state, action) => {
      state.totalPages = action.payload;
    },
    setSearchFoodResults: (state, action) => {
      state.searchFoodResults = action.payload;
    },
    setDetailFood: (state, action) => {
      state.detailFood = action.payload;
    },
  },
});

export const { setTrivia, setFoodLists, setTotalPages, setSearchFoodResults, setDetailFood } = foodSlicer.actions;
export default foodSlicer.reducer;
