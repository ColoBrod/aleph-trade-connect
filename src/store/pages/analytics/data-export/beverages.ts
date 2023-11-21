import { createSlice } from "@reduxjs/toolkit";
import { createCustomAsyncThunk } from "~/services/custom-async-thunk";
import { StateBase, initialStateBase } from './utils';
import { apiCallPending, apiCallRejected, apiCallFullfilled } from "~/store/utils";

const PAGE_URL = "/analytics/data-export/beverages";

interface State extends StateBase {
  beverages: {
    federalDistrict: string;
    city: string;
    restaurant: string;
    machineModel: string;
    serialNumber: number;
    date: string;
    time: string;
    utc: string;
    recipe: string;
    cupSize: string;
    total: number;
  }[];
}

const initialState: State = Object.assign({ beverages: [] }, initialStateBase);

export const fetchBeverages = createCustomAsyncThunk("post", PAGE_URL);

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
      .addCase(fetchBeverages.pending, apiCallPending)
      .addCase(fetchBeverages.rejected, apiCallRejected)
      .addCase(fetchBeverages.fulfilled, apiCallFullfilled)
      // .addCase(fetchBeverages.fulfilled, (state, action) => {
      //   state.status = 'success';
      //   const { beverages, pagesTotal } = action.payload;
      //   state.beverages = beverages;
      //   state.pagesTotal = pagesTotal;
      //   // state.beverages = 
      // })
      // .addCase(fetchBeverages.rejected, (state, action) => {
      //   state.status = 'error';
      //   const { message } = action.error;
      //   if (message) state.error = message;
      // })
      // .addCase(fetchBeverages.pending, (state, action) => {
      //   state.status = 'loading';
      // })
  }
});

export const { idleSet } = slice.actions;
export default slice.reducer;