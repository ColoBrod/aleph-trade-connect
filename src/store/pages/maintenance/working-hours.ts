import { createSlice } from "@reduxjs/toolkit";
import { createCustomAsyncThunk } from "~/services/custom-async-thunk";

export const fetchDowntimeByHour = null
export const fetchDowntimeCauses = null
export const fetchDowntimeErrors = null
export const fetchDowntimeByWeekday = null
export const fetchDowntimeByWeek = null
export const fetchDowntimeByPath = null


const slice = createSlice({
  name: 'working-hours',
  initialState: {},
  reducers: {},
  extraReducers(builder) {
    // builder
      // .addCase()
  },
})

export default slice.reducer;