import { createSlice, combineReducers } from "@reduxjs/toolkit";
import beveragesReducer from './beverages';
import cleaningsReducer from './cleanings';
import InitialFilters from "~/store/filters/initial";
import { IFilters_Analytics_DataExport } from "~/interfaces/filters";
import { _dateRangeSet, _timeRangeSet, _serialNumberAdded, _serialNumberRemoved } from "../../utils";

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

const state = new InitialFilters('analytics/data-export');
export const initialState = { ...state } as IFilters_Analytics_DataExport;

const slice = createSlice({
  name: 'data-export',
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
  beverages: beveragesReducer,
  cleanings: cleaningsReducer,
});

export const { 
  dateRangeSet, 
  timeRangeSet,
  serialNumberAdded,
  serialNumberRemoved,
} = slice.actions;
export default reducer;  
