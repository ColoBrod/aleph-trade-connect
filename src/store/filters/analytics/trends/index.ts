import { createSlice } from "@reduxjs/toolkit";
import { IFilters_Analytics_Trends } from "~/interfaces/filters";

const initialState: IFilters_Analytics_Trends = {
  recipes: [
    { id: 1, name: "Американо 200мл", active: true },
    { id: 2, name: "Капучино 400мл", active: true },
    { id: 3, name: "Капучино 200мл", active: true },
    { id: 4, name: "Латте 400мл", active: true },
    { id: 5, name: "Эспрессо 20мл", active: true },
    { id: 6, name: "Эспрессо 40мл", active: true },
  ],
}

const slice = createSlice({
  name: 'trends', 
  initialState,
  reducers: {
    recipeToggled: (state, action) => {
      const { id, active } = action.payload;
      const recipe = state.recipes.find(r => r.id === id);
      if (recipe === undefined) return;
      recipe.active = !active;
    },
  },
})

export const { recipeToggled } = slice.actions;
export default slice.reducer;