import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios";
import config from "~/config";
import { Status } from "~/interfaces/common";

const BASE_URL = config.api.url + "/entities";

interface Entities {
  status: Status;
  error: string;
  data: {
    dispensings: number;
    coffeeMachines: number[];
  };
}

const initialState: Entities = {
  status: 'idle',
  error: "",
  data: {
    dispensings: 0,
    coffeeMachines: [],
  },
};

export const fetchDispensings = createAsyncThunk('entities/dispensings', async () => {
  const response = await axios.get(BASE_URL + '/dispensings');
  return response.data;
});

const slice = createSlice({
  name: 'dispensings',
  initialState,
  reducers: {
    // getDispensings: (state, action) => {
    // },
  }, 
  extraReducers(builder) {
    builder
      .addCase(fetchDispensings.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchDispensings.fulfilled, (state, action) => {
        state.status = 'success';
        const { dispensingsByDate } = action.payload;
        // state.dispensingsByDate.data = dispensingsByDate;
      })
      .addCase(fetchDispensings.rejected, (state, action) => {
        // state.dispensingsByDate.status = 'error';
        const { message } = action.error;
        // if (message) state.dispensingsByDate.error = message;
      })
  }

});

// export const { getDispensings } = slice.actions;
export default slice.reducer;