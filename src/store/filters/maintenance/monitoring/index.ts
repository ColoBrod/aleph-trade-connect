import { createSlice } from "@reduxjs/toolkit";

import InitialFilters from "~/store/filters/initial";
import { IFilters_Maintenance_Monitoring } from "~/interfaces/filters";
import { _activePageSet, _rowsPerPageSet, _orderBySet, _eventSet } from "~/store/filters/utils";

const state = new InitialFilters('maintenance/monitoring');
export const initialState = { ...state } as IFilters_Maintenance_Monitoring;

const slice = createSlice({
  name: 'monitoring',
  initialState,
  reducers: {
    rowsPerPageSet: _rowsPerPageSet,
    activePageSet: _activePageSet,
    orderBySet: _orderBySet,
    eventSet: _eventSet,
  }
})

export const { rowsPerPageSet, activePageSet, orderBySet, eventSet } = slice.actions;
export default slice.reducer;


