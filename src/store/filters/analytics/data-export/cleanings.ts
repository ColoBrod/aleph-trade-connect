import { createSlice } from "@reduxjs/toolkit";
import { _activePageSet, _rowsPerPageSet } from "./utils";
import { _dateRangeSet } from "~/store/filters/utils";
import InitialFilters from "~/store/filters/initial";
import { IFilters_Analytics_DataExport_Cleanings } from "~/interfaces/filters";

const state = new InitialFilters('analytics/data-export/cleanings');
export const initialState = { ...state } as IFilters_Analytics_DataExport_Cleanings;

// interface State extends StateWithPagination {
//   pagination: {
//     perPage: number;
//     activePage: number;
//   };
// }

// const initialState: State = {
//   pagination: {
//     perPage: 20,
//     activePage: 1,
//   },
// }

const slice = createSlice({
  name: 'cleanings',
  initialState,
  reducers: {
    // dateRangeSet: funcDateRangeSet,
    rowsPerPageSet: _rowsPerPageSet,
    activePageSet: _activePageSet,
  },
});

export const { rowsPerPageSet, activePageSet } = slice.actions;
export default slice.reducer;