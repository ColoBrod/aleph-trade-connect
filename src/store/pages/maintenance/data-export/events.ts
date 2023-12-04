import { createSlice } from "@reduxjs/toolkit";
import { createCustomAsyncThunk } from "~/services/custom-async-thunk";
import { StateBase, initialStateBase } from './utils'; 
import { apiCallPending, apiCallRejected, apiCallFullfilled } from "~/store/utils";
import { RootState } from "~/store";

const PAGE_URL = "/maintenance/data-export/events";

interface State extends StateBase {
  events: {
    federalDistrict: string;
    city: string;
    restaurant: string;
    machineModel: string;
    serialNumber: string;
    errorCode: string;
    errorDesc: string;
    date: string;
    time: string;
    utc: string;
    duration: string;
  }[];
}

const initialState: State = Object.assign({ events: [] }, initialStateBase);

export const fetchEvents = createCustomAsyncThunk("post", PAGE_URL);

const slice = createSlice({
  name: 'time',
  initialState,
  reducers: {
    idleSet: (state, action) => {
      state.status = 'idle';
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchEvents.pending, apiCallPending)
      .addCase(fetchEvents.rejected, apiCallRejected)
      .addCase(fetchEvents.fulfilled, apiCallFullfilled)
  }
});

export const { idleSet } = slice.actions;
export default slice.reducer;