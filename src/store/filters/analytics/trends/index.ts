import { createSlice } from "@reduxjs/toolkit";
import { IFilters_Analytics_Trends } from "~/interfaces/filters";
import InitialFilters from "../../initial";
import { _recipeToggled, _recipesSelected, _recipesUnselected, _dateRangeSet } from "~/store/filters/utils";

// export const initialState = new InitialFilters('analytics/trends') as IFilters_Analytics_Trends; 
// const serializable = { ...initialState };

const state = new InitialFilters('analytics/trends');
const initialState = { ...state } as IFilters_Analytics_Trends;

const slice = createSlice({
  name: 'trends', 
  initialState,
  reducers: {
    dateRangeSet: _dateRangeSet,
    recipeToggled: _recipeToggled,
    recipesSelected: _recipesSelected,
    recipesUnselected: _recipesUnselected,
  },
})

export const { dateRangeSet, recipeToggled, recipesSelected, recipesUnselected } = slice.actions;
export default slice.reducer;