import { createSlice } from "@reduxjs/toolkit"

import { Filters } from "~/store/filters/interfaces";

const initialState: Filters = {
  businessUnits: [],
  coffeeMachineSubstring: "",
  coffeeMachineModels: {
    selectAll: false,
    list: [
      { checked: true, id: 'coffee-machine-1', name: 'WMF 1500S+' },
      { checked: true, id: 'coffee-machine-2', name: 'WMF 5000' },
      { checked: false, id: 'coffee-machine-3', name: 'WMF 9000' },
      { checked: false, id: 'coffee-machine-4', name: 'WMF 9000' },
      { checked: false, id: 'coffee-machine-5', name: 'WMF 9000' },
      { checked: false, id: 'coffee-machine-6', name: 'WMF 9000' },
      { checked: false, id: 'coffee-machine-7', name: 'WMF 9000' },
    ],
  },
  
  dateRange: {
    // start: (new Date()).toString(),
    // end: (new Date()).toString(),
  },
  timeRange: {
    start: "00:00",
    end: "23:00",
  },
  recipes: [],
  serialNumberSubstrings: [],
  errors: [],
};

const slice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    coffeeMachineModelsAllSelected: (state, action) => {
      const { value } = action.payload;
      console.log(value);
      state.coffeeMachineModels.selectAll = value;
      state.coffeeMachineModels.list.forEach(el => el.checked = value);
    },
    modelSearched: (state, action) => {
      const { substring } = action.payload;
    },
    serialNumberAdded: (state, action) => {
      const { substring } = action.payload;
      const { serialNumberSubstrings: list } = state;
      if (!substring || list.indexOf(substring) !== -1) return;
      list.push(substring);
    },
    serialNumberRemoved: (state, action) => {
      const { substring } = action.payload;
      const { serialNumberSubstrings: list } = state;
      const index = list.indexOf(substring);
      list.splice(index, 1);
    },
    dateRangeSet: (state, action) => {
      const { start, end } = action.payload;
      if (start) state.dateRange.start = start;
      if (end) state.dateRange.end = end;
    },
  }
});

export const { coffeeMachineModelsAllSelected, modelSearched, serialNumberAdded, serialNumberRemoved, dateRangeSet } = slice.actions;
export default slice.reducer;