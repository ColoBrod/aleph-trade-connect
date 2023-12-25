import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createCustomAsyncThunk } from "~/services/custom-async-thunk";

import { Status } from "~/interfaces/common";
import { apiCallPending, apiCallRejected } from "~/store/utils";
const PAGE_URL = "/modal-box/events-history";

export const fetchEventsHistory = createCustomAsyncThunk("post", PAGE_URL);

// Интерфейс для строки в Модальном окне.
export interface IRow {
  errorCode: string;
  errorDesc: string;
  datetime: string;
  utc: string;
  duration: string;
}

interface State {
  status: Status;
  error: string;
  eventsHistory: IRow[];
  utc: string;
}

const initialState: State = {
  status: 'idle',
  error: '',
  eventsHistory: [],
  utc: "+03:00",
};

const slice = createSlice({
  name: 'events-history',
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
      .addCase(fetchEventsHistory.pending, apiCallPending)
      .addCase(fetchEventsHistory.fulfilled, (state, action) => {
        state.status = 'success';
        state.eventsHistory = action.payload.eventsHistory;
        // Object.assign(state.status, eventsHistory);
      })
      .addCase(fetchEventsHistory.rejected, apiCallRejected)
  }
})

export const { utcSet, idleSet } = slice.actions;
export default slice.reducer;