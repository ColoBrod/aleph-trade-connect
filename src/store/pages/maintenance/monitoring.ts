import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import { createCustomAsyncThunk } from "~/services/custom-async-thunk";
import { Status } from "~/interfaces/common";
import { RootState } from "~/store";
import axios, { AxiosRequestConfig } from "axios";
import config from "~/config";
import { apiCallPending, apiCallRejected } from "~/store/utils";

// Внимание!!! Это другой URL, не тот же, что используется на остальных страницах
// const BASE_URL = "https://wmf24.ru/api";
const BASE_URL = "https://backend.wmf24.ru/api"

export interface IRow {
  id: string;
  coffeeMachineId: string;
  startDateTime: string;
  duration: string;
  errorCode: string;
  errorText: string;

  // name?: string; // Только в Пушере
  // company: string;
  // error_code: string;
  // start_datetime: string;
  // end_datetime: string;
  // error_text: string;
  // updated_at: string;
  // created_at: string;
  // duration: string;
}

export interface IRowFmt {
  id: string;
  businessUnit: string;
  model: string;
  path: string;
  serialNumber: string;
  errorCode: string;
  errorDesc: string;
  dateObj: Date;
  datetime: string;
  duration: string;
}

interface State {
  status: Status;
  error: string;
  data: IRow[];
  utc: string;
  // orderBy: keyof IRowFmt | "";
}

const initialState: State = {
  status: 'idle',
  error: '',
  data: [],
  utc: "+03:00",
  // orderBy: "",
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
    console.log("RESPONSE:", response.data)
    return response.data;
  }
)

export const updateTime = createAsyncThunk<any, void, { state: RootState }>(
  '/timeerrordown', 
  async (arg, { getState }) => {
    const state = getState();
    const rows = state.pages.maintenance.monitoring.data;
    const config: AxiosRequestConfig = {
      url: BASE_URL + '/timeerrordown',
      method: 'post',
      data: rows.map(row => row.id),
    }
    const result = await axios(config);
    // const result = await Promise.all(rows.map(async (row) => {
    //   config.data = { id: row.id };
    //   const res = await axios(config);
    //   // console.log("Res:", res);
    //   return res.data;
    //   // return ({ id: res.id, duration: res.duration, end_datetime: res.end_datetime });
    //   // row.duration = response.duration;
    // }))
    return result;
    // await axios()
    // const config = {
    //   url: BASE_URL + '/timeerrordown',
    //   method: 'post',
    //   data: { id: 7093 },
    // };
    // const response = await axios(config);
    // console.log("Timer:", response.data);
    // return response.data;
  }
)

// createCustomAsyncThunk("get", `${BASE_URL}/consoledata`);
// createCustomAsyncThunk("post", `${BASE_URL}/timeerrordown`);

const slice = createSlice({
  name: 'monitoring',
  initialState,
  reducers: {
    utcSet: (state, action) => {
      const utc = action.payload;
      console.log("UTC set:", utc)
      // if (typeof utc !== 'number') return;
      state.utc = utc;
    },
    idleSet: (state, action) => {
      state.status = 'idle';
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchEvents.pending, apiCallPending)
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.status = 'success';
        const { payload: rows } = action;
        // rows.forEach((row, i, rows) => {
          // rows[i].date
          // rows[i]
        // })
        // state.data = action.payload;
        state.data = rows;
        console.table(action.payload);
      })
      .addCase(fetchEvents.rejected, apiCallRejected)
      .addCase(updateTime.fulfilled, (state, action) => {
        // console.log(action.payload);
        state.data.forEach((row, i) => {
          // @ts-ignore
          const proxy = action.payload.find(r => r.id === row.id);
          if (proxy) row.duration = proxy.end_datetime;
          else state.data.splice(i, 1);
          // console.log(proxy);
        })
        // console.log("Data:", current(state.data));
      })
  },
})

export const {
  idleSet, utcSet
} = slice.actions;
export default slice.reducer;