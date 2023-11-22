import { createSlice } from "@reduxjs/toolkit";
import { StateWithPagination, _activePageSet, _rowsPerPageSet } from "./utils";

interface State extends StateWithPagination {
  pagination: {
    perPage: number;
    activePage: number;
  };
}

const initialState: State = {
  pagination: {
    perPage: 20,
    activePage: 1,
  },
}

const slice = createSlice({
  name: 'data-export',
  initialState,
  reducers: {
    rowsPerPageSet: _rowsPerPageSet,
    activePageSet: _activePageSet,
  },
});

export const { rowsPerPageSet, activePageSet } = slice.actions;
export default slice.reducer;