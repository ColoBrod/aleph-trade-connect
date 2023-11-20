import { createSlice } from "@reduxjs/toolkit";
import { createCustomAsyncThunk } from "~/services/custom-async-thunk";
import { Status } from '~/interfaces/common';

const PAGE_URL = "/analytics/data-export/beverages";

interface State {
  status: Status;
  error: string;
  pagesTotal: number;
  activePage: number;
  beverages: {
    federalDistrict: string;
    city: string;
    address: string;
    machineModel: string;
    serialNumber: number;
    date: string;
    total: number;
    beverage: string;
  }[];
}

const initialState: State = {
  status: 'idle',
  error: "",
  pagesTotal: 0,
  activePage: 0,
  beverages: [],
}

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
      .addCase(fetchBeverages.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchBeverages.fulfilled, (state, action) => {
        state.status = 'success';
        const { beverages, pagesTotal } = action.payload;
        state.beverages = beverages;
        state.pagesTotal = pagesTotal;
        // state.beverages = 
      })
      .addCase(fetchBeverages.rejected, (state, action) => {
        state.status = 'error';
        const { message } = action.error;
        if (message) state.error = message;
      })
  }
});

export const { idleSet } = slice.actions;
export default slice.reducer;