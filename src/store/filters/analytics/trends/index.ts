import { createSlice } from "@reduxjs/toolkit";
import { IFilters_Analytics_Trends } from "~/interfaces/filters";

const initialState: IFilters_Analytics_Trends = {
  recipes: [],
}

const slice = createSlice({
  name: 'trends', 
  initialState,
  reducers: {
    recipeToggled: (state, action) => {
      const id = action.payload;
      const rIndex = state.recipes.indexOf(id);
      if (rIndex === -1) state.recipes.push(id);
      else state.recipes.splice(rIndex, 1);
    },
  },
})

export const { recipeToggled } = slice.actions;
export default slice.reducer;