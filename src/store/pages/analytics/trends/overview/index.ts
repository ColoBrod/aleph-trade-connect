import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit"
import { apiCallBegan } from "~/store/middleware/api";
import axios from 'axios';

const BASE_URL = "http://localhost:9000/api/analytics/trends/overview";

type Status = 'idle' |'loading' | 'success' | 'error';

interface OverviewState {
  dispensingsByDay: {
    status: Status;
    error: string
    data: {
      currentWeek: number[],
      previousWeek: number[],
    },
  },
  consumptions: {
    status: Status,
    error: string
    data: {
      water: number,
      milk: number,
      coffee: number,
      chocolate: number,
    },
  }
}

const initialState: OverviewState = {
  dispensingsByDay: {
    status: 'loading',
    error: "",
    data: {
      currentWeek: [],
      previousWeek: [],
    },
  },
  consumptions: {
    status: 'idle',
    error: "",
    data: {
      water: 0,
      milk: 0,
      coffee: 0,
      chocolate: 0,
    },
  }
};

export const fetchConsumptions = createAsyncThunk('overview/consumptions', async () => {
  const response = await axios.get(BASE_URL + '/consumptions');
  return response.data;
  // try {
  //   const response = await axios.get(BASE_URL + '/consumptions');
  //   console.log("Response", response);    
  //   return response.data;
  // }
  // catch (err) {
  //   // @ts-ignore
  //   return err.message;
  // }
})

const slice = createSlice({
  name: 'overview',
  initialState,
  reducers: {
    dispensingsByDayRequested: (state, action) => {
      state.dispensingsByDay.status = 'loading';
    },
    dispensingsByDayReceived: (state, action) => {
      state.dispensingsByDay.data = action.payload.dispensingsByDay;
      state.dispensingsByDay.status = 'success';
    },
    dispensingsByDayFailed: (state, action) => {
      state.dispensingsByDay.status = 'error';
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchConsumptions.pending, (state, action) => {
        state.consumptions.status = 'loading';
      })
      .addCase(fetchConsumptions.fulfilled, (state, action) => {
        state.consumptions.status = 'success';
        const { consumptions } = action.payload;
        state.consumptions.data = consumptions;
      })
      .addCase(fetchConsumptions.rejected, (state, action) => {
        state.consumptions.status = 'error';
        const { message } = action.error
        if (message) state.consumptions.error = message;
      })
  },
});

export const { dispensingsByDayRequested, dispensingsByDayReceived, dispensingsByDayFailed } = slice.actions;

export const loadDispensingsByDay = () => apiCallBegan({
  url: "/api", 
  method: "get", 
  onStart: dispensingsByDayRequested.type,
  onSuccess: dispensingsByDayReceived.type, 
  onError: dispensingsByDayFailed.type,
});

// @ts-ignore
// export const loadDispensingsByDay = () => (dispatch) => {
//   return dispatch(
//     apiCallBegan({
//       url: "/api", 
//       method: "get", 
//       onStart: dispensingsByDayRequested.type,
//       onSuccess: dispensingsByDayReceived.type, 
//       onError: dispensingsByDayFailed.type,
//     })
//   )
// }


export default slice.reducer;