import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createCustomAsyncThunk } from "~/services/custom-async-thunk";
import { Status } from "~/interfaces/common";
import { RootState } from "~/store";
import axios from "axios";
import config from "~/config";
import { apiCallPending, apiCallRejected } from "~/store/utils";


// Внимание!!! Это другой URL, не тот же, что используется на остальных страницах
const BASE_URL = "https://wmf24.ru/api";

export interface IRow {
  id: number;
  name?: string; // Только в Пушере
  company: string;
  device_code: string;
  error_code: string;
  start_datetime: string;
  error_text: string;
  updated_at: string;
  created_at: string;
}

export interface IRowFmt {
  id: number;
  businessUnit: string;
  model: string;
  path: string;
  serialNumber: string;
  errorCode: string;
  errorDesc: string;
  date: string;
  time: string;
  duration: string;
}

interface State {
  status: Status;
  error: string;
  data: IRow[];
  orderBy: keyof IRowFmt | "";
}

const initialState: State = {
  status: 'idle',
  error: '',
  data: [],
  orderBy: "",
};

export const fetchEvents = createAsyncThunk<any, void, { state: RootState }>(
  '/consoledata', 
  async (arg, { getState }) => {
    const state = getState();
    const config = {
      url: BASE_URL + '/consoledata',
      method: 'get',
    };
    const response = await axios(config);
    return response.data;
  }
)

export const updateTime = createAsyncThunk<any, void, { state: RootState }>(
  '/timeerrordown', 
  async (arg, { getState }) => {
    const state = getState();
    const config = {
      url: BASE_URL + '/timeerrordown',
      method: 'post',
    };
    const response = await axios(config);
    console.log("Timer:", response.data);
    return response.data;
  }
)

// createCustomAsyncThunk("get", `${BASE_URL}/consoledata`);
// createCustomAsyncThunk("post", `${BASE_URL}/timeerrordown`);

const slice = createSlice({
  name: 'monitoring',
  initialState,
  reducers: {
    idleSet: (state, action) => {
      state.status = 'idle';
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchEvents.pending, apiCallPending)
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.status = 'success';
        state.data = action.payload;
      })
      .addCase(fetchEvents.rejected, apiCallRejected)
  },
})

export const {
  idleSet
} = slice.actions;
export default slice.reducer;