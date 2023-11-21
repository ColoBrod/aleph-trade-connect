import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import config from "~/config";
import { IFilters_Analytics, IFilters_Analytics_DaylyReports } from "~/interfaces/filters";
import { RootState } from "~/store";

const API_URL = config.api.url;

const FILTER_ERR = new Error("Не указаны передаваемые фильтры или endpoint API (path) не существует.")

// const filters = {
//   'entities': {

//   },
//   'analytics': {
//     'trends': {
      
//     },
//     'dayly-reports': {

//     },
//     'data-export': {

//     },
//   },
//   'maintenance': {

//   },
//   'administration': {

//   },
//   'map': {

//   },
//   'profile': {

//   },
// }

// const getFilters = (pathStr: string, state: RootState) => {
//   const path = pathStr.split("/");
//   if (path.length === 0) return {};
//   if (path[0] === "") path.shift();
//   // if (!(path[0] in filters)) throw FILTER_ERR;
//   const filters = {}
//   switch (path[0]) {
//     case 'entities': 
//       return {};
//     case 'analytics':
//       if (path[1] === '')

//       return {};
//     case 'maintenance':
//       return {};
//     case 'administration':
//       return {};
//     case 'map': 
//       return {};
//     case 'profile': 
//       return {};
//     default:
//       if (process.env.NODE_ENV === 'production') return {};
//       throw FILTER_ERR;
//   }
// }

export const createCustomAsyncThunk = (method: "get" | "post", path: string, filters?: string[]) => {
  return createAsyncThunk<any, void, { state: RootState }>(path, async (arg, { getState }) => {
    const state = getState();
    const filters = Object.assign(
      {},
      state.filters.analytics.common,
      state.filters.analytics.daylyReports,
      state.filters.analytics.dataExport.beverages,
    )
    // state.filters.analytics.daylyReports;
    const filtersFmt = fmtFilters(filters);

    const axiosConfig = {
      url: API_URL + path,
      method,
      data: {
        filters: filtersFmt,
      },
    }
    const response = await axios(axiosConfig);
    // const response = await axios[method](API_URL + path);
    return response.data;
  })
};

function fmtFilters(original: IFilters_Analytics & IFilters_Analytics_DaylyReports) {
  const filters: any = {};
  // : any = structuredClone(original);
  // if ('businessUnits' in filters) filters.businessUnits
  if ('coffeeMachineModels' in original) filters.coffeeMachineModels = 
    original.coffeeMachineModels.list
      .filter(model => model.checked === true)
      .map(model => model.id);

  if ('serialNumbers' in original) 
    filters.serialNumbers = original.serialNumbers.list;

  if ('pagination' in original)
    filters.pagination = original.pagination;

  return filters;

  // for (const filter in filters) {
  //   switch (filter) {

  //   }
  // }
}