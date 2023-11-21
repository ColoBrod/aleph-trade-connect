import { createSlice } from "@reduxjs/toolkit";
import { createCustomAsyncThunk } from "~/services/custom-async-thunk";
import { StateBase, initialStateBase } from './utils';
import { apiCallPending, apiCallRejected, apiCallFullfilled } from "~/store/utils";

const PAGE_URL = "/analytics/data-export/cleanings";

interface State extends StateBase {
  cleanings: {
    federalDistrict: string;
    city: string;
    restaurant: string;
    machineModel: string;
    serialNumber: number;
    date: string;
    time: string;
    utc: string;
    type: string;
    planned: number;
    total: number;
  }[];
}

const initialState: State = Object.assign({ cleanings: [] }, initialStateBase);

// TODO: Check filters for 'cleanings'
export const fetchCleanings = createCustomAsyncThunk("post", PAGE_URL);

const slice = createSlice({
  name: 'beverages',
  initialState,
  reducers: {
    idleSet: (state, action) => {
      state.status = 'idle';
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchCleanings.pending, apiCallPending)
      .addCase(fetchCleanings.rejected, apiCallRejected)
      .addCase(fetchCleanings.fulfilled, apiCallFullfilled)
  }
});

export const { idleSet } = slice.actions;
export default slice.reducer;




