import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import config from "~/config";

const BASE_URL = config.api.url + "/analytics/data-export/beverages";

interface State {
  rows: number;
}

const initialState: State = {
  rows: 10,
};

// export const fetchDispensingsByDate = createAsyncThunk('analytics/trends/sales/dispensings-by-date', async () => {
//   const response = await axios.post(BASE_URL + '/dispensings-by-date');
//   return response.data;
// });

const slice = createSlice({
  name: 'beverages',
  initialState,
  reducers: {
    rowsSet: (state, action) => {
      const { rows } = action.payload;
      state.rows = rows;
    },

  },
  extraReducers(builder) {
    // builder
      // .addCase(fetchDispensingsByDate.pending, (state, action) => {
      //   state.dispensingsByDate.status = 'loading';
      // })
      // .addCase(fetchDispensingsByDate.fulfilled, (state, action) => {
      //   state.dispensingsByDate.status = 'success';
      //   const { dispensingsByDate } = action.payload;
      //   state.dispensingsByDate.data = dispensingsByDate;
      // })
      // .addCase(fetchDispensingsByDate.rejected, (state, action) => {
      //   state.dispensingsByDate.status = 'error';
      //   const { message } = action.error;
      //   if (message) state.dispensingsByDate.error = message;
      // })
  },
});

export const { rowsSet } = slice.actions;
export default slice.reducer;