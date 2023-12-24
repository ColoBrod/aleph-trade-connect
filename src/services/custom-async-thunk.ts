import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import config from "~/config";
import InitialFilters from "~/store/filters/initial";
import { IFilters_Analytics, IFilters_Analytics_DaylyReports } from "~/interfaces/filters";
import { RootState } from "~/store";

let API_URL = config.api.url;
// const API_URL = config.api.url;

const FILTER_ERR = new Error("Не указаны передаваемые фильтры или endpoint API (path) не существует.")

export const createCustomAsyncThunk = (method: "get" | "post", path: string, filters?: (state: RootState) => any[]) => {
  return createAsyncThunk<any, void, { state: RootState }>(path, async (arg, { getState }) => {
    const state = getState();
    // @ts-ignore
    const filters = InitialFilters.getPageFilters(state, path);
    // @ts-ignore
    const filtersFmt = InitialFilters.formatFilters(filters);
    if (path.includes('/entities')) API_URL = "https://backend.wmf24.ru/api"
    else API_URL = config.api.url;
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