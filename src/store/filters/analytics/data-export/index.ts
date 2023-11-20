// import { createSlice } from "@reduxjs/toolkit";

// interface State {
//   beverages: {
//     list: {

//     }[],
//     pagination: {
//       perPage: number;
//       pagesTotal: number;
//       activePage: number;
//     };
//   };
// }

// const initialState: State = {
//   beverages: {
//     list: [],
//     pagination: {
//       perPage: 10,
//       pagesTotal: 10,
//       activePage: 5,
//     },
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

// const slice = createSlice({
//   name: 'data-export',
//   initialState,
//   reducers: {

//   },
//   extraReducers(builder) {
//     // builder
//       // .addCase()
//   },
// });

import { combineReducers } from '@reduxjs/toolkit';
import beveragesReducer from './beverages';

const reducer = combineReducers({
  beverages: beveragesReducer
});

export default reducer;  
