import { createSlice } from "@reduxjs/toolkit";
import { IFilters_Analytics_Trends } from "~/interfaces/filters";
import InitialFilters from "../../initial";
import { _recipeToggled } from "~/store/filters/utils";
import { _dateRangeSet } from "~/store/filters/utils";

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
  },
})

export const { dateRangeSet, recipeToggled } = slice.actions;
export default slice.reducer;