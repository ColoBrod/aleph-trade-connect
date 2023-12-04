import { createSlice } from "@reduxjs/toolkit";
import InitialFilters from "~/store/filters/initial";
import { IFilters_Maintenance_DataExport_Time } from "~/interfaces/filters";
import { _activePageSet, _rowsPerPageSet } from "~/store/filters/utils";

const state = new InitialFilters('maintenance/data-export/time');
export const initialState = { ...state } as IFilters_Maintenance_DataExport_Time;

const slice = createSlice({
  name: 'time',
  initialState,
  reducers: {
    rowsPerPageSet: _rowsPerPageSet,
    activePageSet: _activePageSet,
  },
});

export const { rowsPerPageSet, activePageSet } = slice.actions;
export default slice.reducer;