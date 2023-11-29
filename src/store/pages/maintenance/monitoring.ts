import { createSlice } from "@reduxjs/toolkit";
import { createCustomAsyncThunk } from "~/services/custom-async-thunk";

// Внимание!!! Это другой URL, не тот же, что используется на остальных страницах
const BASE_URL = "https://wmf24.ru/api";

interface IRow {
  id: number;
  name?: string; // Только в Пушере
  company: string;
  device_code: string;
  error_code: string;
  start_time: string;
  error_text: {
    description: string;
  };
  updated_at: string;
  created_at: string;
}

interface IRowFmt {
  
}

interface State {
  data: IRow[];
}

const initialState: State = {
  data: [],
};

const fetchEvents = createCustomAsyncThunk("get", `${BASE_URL}/consoledata`);
const updateTime = createCustomAsyncThunk("get", `${BASE_URL}/timeerrordown`);

const slice = createSlice({
  name: 'monitoring',
  initialState: {},
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchEvents.)
    // builder
      // .addCase()
  },
})

export default slice.reducer;