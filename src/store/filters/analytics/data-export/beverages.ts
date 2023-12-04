import { createSlice } from "@reduxjs/toolkit";
import { _activePageSet, _rowsPerPageSet, _orderBySet } from "~/store/filters/utils";
import InitialFilters from "~/store/filters/initial";
import { IFilters_Analytics_DataExport_Beverages } from "~/interfaces/filters";

const state = new InitialFilters('analytics/data-export/beverages');
export const initialState = { ...state } as IFilters_Analytics_DataExport_Beverages;

// interface State extends StateWithPagination {}

// const initialState: State = {
//   pagination: {
//     perPage: 10,
//     activePage: 1,
//   },
// }

// createAsyncThunk<any, void, { state: RootState }>(path, async (arg, { getState }) => {
//   const state = getState();
//   const filters = Object.assign(
//     {},
//     state.filters.analytics.common,
//     state.filters.analytics.daylyReports
//   )
//   // state.filters.analytics.daylyReports;
//   const filtersFmt = fmtFilters(filters);

//   const axiosConfig = {
//     url: API_URL + path,
//     method,
//     data: {
//       filters: filtersFmt,
//     },
//   }
//   const response = await axios(axiosConfig);
//   // const response = await axios[method](API_URL + path);
//   return response.data;
// })

const slice = createSlice({
  name: 'beverages',
  initialState,
  reducers: {
    rowsPerPageSet: _rowsPerPageSet,
    activePageSet: _activePageSet,
    orderBySet: _orderBySet,
    // rowsPerPageSet: (state, action) => {
    //   const perPage = action.payload;
    //   if (perPage === undefined) return;
    //   state.pagination.perPage = perPage;
    // },
    // activePageSet: (state, action) => {
    //   const page = action.payload;
    //   if (page === undefined) return;
    //   state.pagination.activePage = page;
    //   console.log("Page set:", page);
    // },
  },
  extraReducers(builder) {
    // builder
      // .addCase()
  },
});

export const { rowsPerPageSet, activePageSet, orderBySet } = slice.actions;
export default slice.reducer;