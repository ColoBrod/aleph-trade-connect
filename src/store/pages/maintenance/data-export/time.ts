import { createSlice } from "@reduxjs/toolkit";
import { createCustomAsyncThunk } from "~/services/custom-async-thunk";
import { StateBase, initialStateBase } from './utils'; 
import { apiCallPending, apiCallRejected, apiCallFullfilled } from "~/store/utils";

const PAGE_URL = "/maintenance/data-export/time";

interface State extends StateBase {
  time: {
    federalDistrict: string;
    city: string;
    restaurant: string;
    machineModel: string;
    serialNumber: string;
    date: string;
    time: string;
    utc: string;
    uptimeFrom: string;
    downtimeByBreakdown: string;
    downtimeByService: string;
    timeTotal: string;
  }[];
}

const initialState: State = Object.assign({ time: [] }, initialStateBase);

export const fetchTime = createCustomAsyncThunk("post", PAGE_URL);

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
      .addCase(fetchTime.pending, apiCallPending)
      .addCase(fetchTime.rejected, apiCallRejected)
      .addCase(fetchTime.fulfilled, apiCallFullfilled)
  }
});

export const { idleSet } = slice.actions;
export default slice.reducer;