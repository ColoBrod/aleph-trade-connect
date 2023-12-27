import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// import axios, { AxiosError, AxiosResponse } from "axios";
import { Status } from "~/interfaces/common";
import { IRow, fetchEvents, updateTime } from "~/store/pages/maintenance/monitoring";
import { apiCallPending, apiCallRejected } from "~/store/utils";

// Интерфейс для строки в Модальном окне.
export interface IRowFmt2 {
  id: string;
  errorCode: string;
  errorType: string;
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
}

const initialState: State = {
  status: 'idle',
  error: '',
  data: [],
  utc: "+03:00",
};

const slice = createSlice({
  name: 'monitoring',
  initialState,
  reducers: {
    utcSet: (state, action) => {
      const utc = action.payload;
      console.log("UTC set:", utc)
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
        state.data = rows;
      })
      .addCase(fetchEvents.rejected, apiCallRejected)
      .addCase(updateTime.fulfilled, (state, action) => {
        state.data.forEach((row, i) => {
          // @ts-ignore
          const proxy = action.payload.data.find(r => r.id === row.id);
          if (proxy) row.duration = proxy.end_datetime;
          else state.data.splice(i, 1);
        })
      })
  },
})

export const { idleSet, utcSet } = slice.actions;
export default slice.reducer;
