import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { Status } from "~/interfaces/common";
import { apiCallPending, apiCallRejected } from "~/store/utils";

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
  data: IRow[];
  utc: string;
}

const initialState: State = {
  status: 'idle',
  error: '',
  data: [],
  utc: "+03:00",
};
