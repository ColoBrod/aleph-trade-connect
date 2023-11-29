import { createSlice } from "@reduxjs/toolkit";

import InitialFilters from "~/store/filters/initial";
import { IFilters_Maintenance_Monitoring } from "~/interfaces/filters";
import { _activePageSet, _rowsPerPageSet } from "~/store/filters/utils";

const state = new InitialFilters('maintenance/monitoring');
export const initialState = { ...state } as IFilters_Maintenance_Monitoring;

const slice = createSlice({
  name: 'monitoring',
  initialState,
  reducers: {
    rowsPerPageSet: _rowsPerPageSet,
    activePageSet: _activePageSet,
  }
})

export const { rowsPerPageSet, activePageSet } = slice.actions;
export default slice.reducer;


