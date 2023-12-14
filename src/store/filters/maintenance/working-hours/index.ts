import { createSlice } from "@reduxjs/toolkit";

import InitialFilters from "~/store/filters/initial";
import { IFilters_Maintenance_WorkingHours } from "~/interfaces/filters";
import { _dateRangeSet } from "~/store/filters/utils";

const state = new InitialFilters('maintenance/working-hours');
export const initialState = { ...state } as IFilters_Maintenance_WorkingHours;

const slice = createSlice({
  name: 'working-hours',
  initialState,
  reducers: {
    dateRangeSet: _dateRangeSet,
  },
});

export const { dateRangeSet } = slice.actions;
export default slice.reducer;


