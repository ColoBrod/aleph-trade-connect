import { createSlice } from "@reduxjs/toolkit";
import { createCustomAsyncThunk } from "~/services/custom-async-thunk";
import { Status } from '~/interfaces/common';

const PAGE_URL = "/analytics/trends/overview";

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
  },
  cleanings: {
    status: Status,
    error: string
    data: {
      currentWeek: number;
      previousWeek: number;
    },
  },
  dispensingsPerMachineAverage: {
    status: Status,
    error: string
    data: {
      name: string;
      value: number;
    }[],
  },
  
}

const initialState: OverviewState = {
  dispensingsByDay: {
    status: 'idle',
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
  },
  cleanings: {
    status: 'idle',
    error: "",
    data: {
      currentWeek: 0,
      previousWeek: 0,
    },
  },
  dispensingsPerMachineAverage: {
    status: 'idle',
    error: "",
    data: [],
  }
};

// const fetchDataThunk = (path: string) => {
//   return createAsyncThunk<any, void, {state: RootState }>(path, async (arg, { getState }) => {
//     const state = getState();
//     const filters = Object.assign(
//       {},

//     )
//   })
// }

export const fetchConsumptions = 
  createCustomAsyncThunk("post", PAGE_URL + "/consumptions");
export const fetchDispensingsByDay = 
  createCustomAsyncThunk("post", PAGE_URL + "/dispensings-by-day");
export const fetchCleanings = 
  createCustomAsyncThunk("post", PAGE_URL + "/cleanings");
export const fetchDispensingsByHierarchyLevel = 
  createCustomAsyncThunk("post", PAGE_URL + "/dispensings-by-hierarchy-level");

const slice = createSlice({
  name: 'overview',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchDispensingsByDay.pending, (state, action) => {
        state.dispensingsByDay.status = 'loading';
      })
      .addCase(fetchDispensingsByDay.fulfilled, (state, action) => {
        state.dispensingsByDay.status = 'success';
        const { dispensingsByDay } = action.payload;
        state.dispensingsByDay.data = dispensingsByDay;
      })
      .addCase(fetchDispensingsByDay.rejected, (state, action) => {
        state.dispensingsByDay.status = 'error';
        const { message } = action.error;
        if (message) state.dispensingsByDay.error = message;
      })
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
      .addCase(fetchCleanings.pending, (state, action) => {
        state.cleanings.status = 'loading';
      })
      .addCase(fetchCleanings.fulfilled, (state, action) => {
        state.cleanings.status = 'success';
        const { cleanings } = action.payload;
        state.cleanings.data = cleanings;
      })
      .addCase(fetchCleanings.rejected, (state, action) => {
        state.cleanings.status = 'error';
        const { message } = action.error;
        if (message) state.cleanings.error = message;
      })
      .addCase(fetchDispensingsByHierarchyLevel.pending, (state, action) => {
        state.dispensingsPerMachineAverage.status = 'loading';
      })
      .addCase(fetchDispensingsByHierarchyLevel.fulfilled, (state, action) => {
        state.dispensingsPerMachineAverage.status = 'success';
        const { dispensingsPerMachineAverage } = action.payload;
        state.dispensingsPerMachineAverage.data = dispensingsPerMachineAverage;
      })
      .addCase(fetchDispensingsByHierarchyLevel.rejected, (state, action) => {
        state.dispensingsPerMachineAverage.status = 'error';
        const { message } = action.error;
        if (message) state.dispensingsPerMachineAverage.error = message;
      })
  },
});

// export const { dispensingsByDayRequested, dispensingsByDayReceived, dispensingsByDayFailed } = slice.actions;

// export const loadDispensingsByDay = () => apiCallBegan({
//   url: "/api", 
//   method: "get", 
//   onStart: dispensingsByDayRequested.type,
//   onSuccess: dispensingsByDayReceived.type, 
//   onError: dispensingsByDayFailed.type,
// });

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