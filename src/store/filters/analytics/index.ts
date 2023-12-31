import { createSlice } from "@reduxjs/toolkit";
// TODO - Should it be imported from redux-toolkit???
import { combineReducers } from "redux";
import { IFilters_Analytics } from "~/interfaces/filters";

// Reducers
import daylyReportsReducer from "./dayly-reports";
import trendsReducer from "./trends";
import dataExportReducer from './data-export';
import InitialFilters from "../initial";

// Shared functions
import { 
  _businessUnitsExpanded, 
  _businessUnitsFilterChanged, 
  _businessUnitsSet, 
  _businessUnitsSelectedAll,
  _coffeeMachineModelSelected 
} from "~/store/filters/utils";

const state = new InitialFilters('analytics'); 
export const initialState = { ...state } as IFilters_Analytics;

const slice = createSlice({
  name: 'analytics',
  initialState,
  reducers: {
    businessUnitsSet: _businessUnitsSet,
    businessUnitsExpanded: _businessUnitsExpanded,
    businessUnitsFilterChanged: _businessUnitsFilterChanged,
    businessUnitsSelectedAll: _businessUnitsSelectedAll,

    // businessUnitsSet: (state, action) => {
    //   state.businessUnits = action.payload;
    // },
    // dateRangeSet: (state, action) => {
    //   const { start, end } = action.payload;
      // if (start) state.dateRange
      // const { id, date } = action.payload;
      // if (id === "date-start") {
      //   // @ts-ignore
      //   state.dateRange.date.start = date;
      // }
      // else if (id === "date-end") {
      //   // @ts-ignore
      //   state.dateRange.date.end = date;
      // }
    // },

    // TODO: Этот метод судя по всему не используется.

    // dateRangeSet2: (state, action) => {
    //   const { start, end } = action.payload;
    //   const curDate = new Date();
    //   const startDate = new Date()
    //   startDate.setDate(curDate.getDate() + start);
    //   const endDate = new Date()
    //   endDate.setDate(curDate.getDate() + end);
    //   // state.dateRange.date.start = startDate.toLocaleDateString("en-US");
    //   // state.dateRange.date.end = endDate.toLocaleDateString("en-US");

    //   // console.log(startDate);
    //   // state.dateRange.date.start = `${startDate.getMonth()}/${startDate.getDate()}/${startDate.getFullYear()}`;
    //   // state.dateRange.date.end = `${endDate.getMonth()}/${endDate.getDate()}/${endDate.getFullYear()}`;
    // },
    coffeeMachineModelSelected: _coffeeMachineModelSelected,

    // (state, action) => {
      // const { id, checked } = action.payload;
      // if (!id) return;
      // const model = state.coffeeMachineModels.list.find((m) => m.id === id);
      // if (model === undefined) return;
      // Object.assign(model, { checked });
      // if (!checked) state.coffeeMachineModels.selectAll = false;
      // else if (state.coffeeMachineModels.list.every(cmm => cmm.checked === true))
      //   state.coffeeMachineModels.selectAll = true;

    // },
    // modelSearched: (state, action) => {
    //   const { substring } = action.payload;
    // },
    // dateRangeSet: (state, action) => {
    //   const { start, end } = action.payload;
    //   if (start) state.dateRange.date.start = start;
    //   if (end) state.dateRange.date.end = end;
    // },
    // businessUnitAdded: (state, action) => { },
    // businessUnitRemoved: (state, action) => { },
    // recipeAdded: (state, action) => { },
    // recipeRemoved: (state, action) => { },
  },

})

const reducer = combineReducers({
  common: slice.reducer,
  daylyReports: daylyReportsReducer,
  trends: trendsReducer,
  dataExport: dataExportReducer,
});

export const {
  businessUnitsSet,
  businessUnitsExpanded,
  businessUnitsFilterChanged,
  businessUnitsSelectedAll,
  coffeeMachineModelSelected,
  // modelSearched,
  // dateRangeSet,
  // dateRangeSet2,
} = slice.actions;
export default reducer;  