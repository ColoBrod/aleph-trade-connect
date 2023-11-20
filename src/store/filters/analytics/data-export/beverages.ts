import { createSlice } from "@reduxjs/toolkit";

interface State {
  pagination: {
    perPage: number;
    activePage: number;
  };
}

const initialState: State = {
  pagination: {
    perPage: 10,
    activePage: 1,
  },
}

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
  name: 'data-export',
  initialState,
  reducers: {
    rowsPerPageSet: (state, action) => {
      const perPage = action.payload;
      if (perPage === undefined) return;
      state.pagination.perPage = perPage;
    },
    activePageSet: (state, action) => {
      const page = action.payload;
      if (page === undefined) return;
      state.pagination.activePage = page;
      console.log("Page set:", page);
    },
  },
  extraReducers(builder) {
    // builder
      // .addCase()
  },
});

export const { rowsPerPageSet, activePageSet } = slice.actions;
export default slice.reducer;