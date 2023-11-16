import { createSlice } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { IFilters_Analytics } from "~/interfaces/filters";

// Reducers
import daylyReportsReducer from "./dayly-reports";

const dateFrom = new Date();
dateFrom.setDate(dateFrom.getDate() - 1);
const dateTo = new Date();
const dateFromFmt = dateFrom.toLocaleDateString();
const dateToFmt = dateTo.toLocaleDateString();

const initialState: IFilters_Analytics = {
  businessUnits: [],
  coffeeMachineModels: {
    substring: "",
    selectAll: true,
    list: [
      { checked: true, id: 'coffee-machine-1', name: 'WMF 1500S+' },
      { checked: true, id: 'coffee-machine-2', name: 'WMF 5000' },
      { checked: true, id: 'coffee-machine-3', name: 'WMF 6000' },
      { checked: true, id: 'coffee-machine-4', name: 'WMF 7000' },
      { checked: true, id: 'coffee-machine-5', name: 'WMF 8000' },
      { checked: true, id: 'coffee-machine-6', name: 'WMF 9000' },
      { checked: true, id: 'coffee-machine-7', name: 'WMF 9000' },
    ],
  },
  dateRange: {
    date: {
      start: dateFromFmt,
      end: dateToFmt,
    }
  },
  recipes: [],
}

const slice = createSlice({
  name: 'analytics',
  initialState,
  reducers: {
    coffeeMachineModelsAllSelected: (state, action) => {
      const { value } = action.payload;
      state.coffeeMachineModels.selectAll = value;
      state.coffeeMachineModels.list.forEach(el => el.checked = value);
    },
    coffeeMachineModelSelected: (state, action) => {
      const { id, checked } = action.payload;
      if (!id) return;
      const model = state.coffeeMachineModels.list.find((m) => m.id === id);
      if (model === undefined) return;
      Object.assign(model, { checked });
      if (!checked) state.coffeeMachineModels.selectAll = false;
      // state.coffeeMachineModels.selectAll = value;

    },
    modelSearched: (state, action) => {
      const { substring } = action.payload;
    },
    dateRangeSet: (state, action) => {
      const { start, end } = action.payload;
      if (start) state.dateRange.date.start = start;
      if (end) state.dateRange.date.end = end;
    },
    businessUnitAdded: (state, action) => { },
    businessUnitRemoved: (state, action) => { },
    recipeAdded: (state, action) => { },
    recipeRemoved: (state, action) => { },
  },

})

const reducer = combineReducers({
  common: slice.reducer,
  daylyReports: daylyReportsReducer,
});

export const { coffeeMachineModelsAllSelected, coffeeMachineModelSelected, modelSearched, dateRangeSet } = slice.actions;
export default reducer;  