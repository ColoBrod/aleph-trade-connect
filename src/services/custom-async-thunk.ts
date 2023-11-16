import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import config from "~/config";
import { RootState } from "~/store";

const API_URL = config.api.url;

export const createCustomAsyncThunk = (method: "get" | "post", path: string, filters?: string[]) => {
  return createAsyncThunk<any, void, { state: RootState }>(path, async (arg, { getState }) => {
    const state = getState();
    const filters = Object.assign(
      {},
      state.filters.analytics.common,
      state.filters.analytics.daylyReports
    )
    // state.filters.analytics.daylyReports;
    const axiosConfig = {
      url: API_URL + path,
      method,
      data: {
        filters
      },
    }
    const response = await axios(axiosConfig);
    // const response = await axios[method](API_URL + path);
    return response.data;
  })
};