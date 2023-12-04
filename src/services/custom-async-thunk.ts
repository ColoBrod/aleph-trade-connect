import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import config from "~/config";
import InitialFilters from "~/store/filters/initial";
import { IFilters_Analytics, IFilters_Analytics_DaylyReports } from "~/interfaces/filters";
import { RootState } from "~/store";

const API_URL = config.api.url;

const FILTER_ERR = new Error("Не указаны передаваемые фильтры или endpoint API (path) не существует.")

export const createCustomAsyncThunk = (method: "get" | "post", path: string, filters?: (state: RootState) => any[]) => {
  return createAsyncThunk<any, void, { state: RootState }>(path, async (arg, { getState }) => {
    const state = getState();
    // const filters = Object.assign(
    //   {},
    //   state.filters.analytics.common,
    //   state.filters.analytics.daylyReports,
    //   state.filters.analytics.dataExport.beverages,
    // )
    // state.filters.analytics.daylyReports;
    // const testFilters = getFilters(path);
    // console.log("Filters", testFilters);

    // @ts-ignore
    const filters = InitialFilters.getPageFilters(state, path);
    // @ts-ignore
    const filtersFmt = InitialFilters.formatFilters(filters);

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

function getFilters(path: string): Object {
  const keys = path.split("/");
  keys.shift();
  console.log("Keys", keys);
  const filters = {};

  return {}
}


// function fmtFilters(original: IFilters_Analytics & IFilters_Analytics_DaylyReports) {
//   const filters: any = {};

//   if ('serialNumbers' in original) 
//     filters.serialNumbers = original.serialNumbers.list;

//   if ('pagination' in original)
//     filters.pagination = original.pagination;

//   return filters;
// }