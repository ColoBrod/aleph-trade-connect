import { createSlice } from "@reduxjs/toolkit";
import { StateBase } from "../analytics/data-export/utils";
import { Status } from "~/interfaces/common";
import { IRow, fetchEvents } from "../maintenance/monitoring";
import { apiCallPending, apiCallRejected } from "~/store/utils";

const BASE_URL = "https://backend.wmf24.ru/api";

export interface IRowFmt {
  id: string;
  path: string;
  restaurant: string;
  machineName: string;
  serialNumber: string;
  modelName: string;
  errors: {
    code: string;
    type: string;
    desc: string;
  }[];
  dateObj: Date;
  datetime: string;
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
  utc: "+03:00"
}

const slice = createSlice({
  name: 'machines',
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
        const { payload: rows } = action;
        state.data = rows;
        console.table(action.payload);
      })
      .addCase(fetchEvents.rejected, apiCallRejected)
  },
});

export const { idleSet } = slice.actions;
export default slice.reducer;