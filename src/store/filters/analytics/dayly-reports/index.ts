import { createSlice } from "@reduxjs/toolkit"

import { IFilters_Analytics_DaylyReports } from "~/interfaces/filters";
import InitialFilters from "../../initial";

import { 
  _dateRangeSet, 
  _timeRangeSet,
  _serialNumberAdded, 
  _serialNumberRemoved,
} from "~/store/filters/utils";

const state = new InitialFilters('analytics/dayly-reports'); 
export const initialState = { ...state } as IFilters_Analytics_DaylyReports;

const slice = createSlice({
  name: 'dayly-reports',
  initialState,
  reducers: {
    dateRangeSet: _dateRangeSet,
    timeRangeSet: _timeRangeSet,
    serialNumberAdded: _serialNumberAdded,
    serialNumberRemoved: _serialNumberRemoved,
    // serialNumberAdded: (state, action) => {
    //   const { substring } = action.payload;
    //   const { list } = state.serialNumbers;
    //   if (!substring || list.indexOf(substring) !== -1) return;
    //   list.push(substring);
    // },
    // serialNumberRemoved: (state, action) => {
    //   const { substring } = action.payload;
    //   const { list } = state.serialNumbers;
    //   const index = list.indexOf(substring);
    //   list.splice(index, 1);
    // },
    // timeRangeSet: (state, action) => {
    //   const { start, end } = action.payload;
    //   if (state.dateRange.time === undefined) return;
    //   if (start) state.dateRange.time.start = start;
    //   if (end) state.dateRange.time.end = end;
    // }
  },
});

// export const 
export const actions = slice.actions;
export const { 
  dateRangeSet,
  timeRangeSet,
  serialNumberAdded, 
  serialNumberRemoved, 
} = slice.actions;
export default slice.reducer;