import { combineReducers, createSlice } from "@reduxjs/toolkit";
import { IFilters_Maintenance_DataExport } from "~/interfaces/filters";
import InitialFilters from "~/store/filters/initial";
import { _dateRangeSet, _timeRangeSet, _serialNumberAdded, _serialNumberRemoved } from "~/store/filters/utils";
import timeReducer from './time';
import eventsReducer from './events';

const state = new InitialFilters("maintenance/data-export");
const initialState = { ...state } as IFilters_Maintenance_DataExport;

const slice = createSlice({
  name: "data-export",
  initialState,
  reducers: {
    dateRangeSet: _dateRangeSet,
    timeRangeSet: _timeRangeSet,
    serialNumberAdded: _serialNumberAdded,
    serialNumberRemoved: _serialNumberRemoved,
  },
});

const reducer = combineReducers({
  shared: slice.reducer,
  time: timeReducer,
  events: eventsReducer,
});

export const {
  dateRangeSet,
  timeRangeSet,
  serialNumberAdded,
  serialNumberRemoved,
} = slice.actions;
export default reducer;



