import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import config from "~/config";
import { IFilters_Analytics, IFilters_Analytics_DaylyReports } from "~/interfaces/filters";
import { RootState } from "~/store";

const API_URL = config.api.url;

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