import { createSlice } from "@reduxjs/toolkit"

import { IFilters_Analytics_DaylyReports } from "~/interfaces/filters";

const dateFrom = new Date();
dateFrom.setDate(dateFrom.getDate() - 1);
const dateTo = new Date();
const dateFromFmt = dateFrom.toLocaleDateString();
const dateToFmt = dateTo.toLocaleDateString();

const initialState: IFilters_Analytics_DaylyReports = {
  dateRange: {
    date: {
      start: dateFromFmt,
      end: dateToFmt,
    },
    time: {
      start: "00:00",
      end: "23:00",
    },
  },
  // Серийный номер
  serialNumbers: {
    substring: "",
    list: [],
  },
  // Базовый тип напитка
  beverages: [],
};

const slice = createSlice({
  name: 'dayly-reports',
  initialState,
  reducers: {
    serialNumberAdded: (state, action) => {
      const { substring } = action.payload;
      const { list } = state.serialNumbers;
      if (!substring || list.indexOf(substring) !== -1) return;
      list.push(substring);
    },
    serialNumberRemoved: (state, action) => {
      const { substring } = action.payload;
      const { list } = state.serialNumbers;
      const index = list.indexOf(substring);
      list.splice(index, 1);
    },
    dateRangeSet: (state, action) => {
      const { start, end } = action.payload;
      if (start) state.dateRange.date.start = start;
      if (end) state.dateRange.date.end = end;
    },
    timeRangeSet: (state, action) => {
      const { start, end } = action.payload;
      if (state.dateRange.time === undefined) return;
      if (start) state.dateRange.time.start = start;
      if (end) state.dateRange.time.end = end;
    }
  }
});

// export const 
export const { serialNumberAdded, serialNumberRemoved, dateRangeSet, timeRangeSet } = slice.actions;
export default slice.reducer;