import { createSlice } from "@reduxjs/toolkit"

interface Dispensing {
  id: number;
}

const initialState: Dispensing[] = [];

const slice = createSlice({
  name: 'dispensings',
  initialState,
  reducers: {
    getDispensings: (state, action) => {
    },
  }
});

export const { getDispensings } = slice.actions;
export default slice.reducer;