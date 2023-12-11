import { createSlice } from "@reduxjs/toolkit";
import { createCustomAsyncThunk } from "~/services/custom-async-thunk";
import { Status } from "~/interfaces/common";
// import { apiCallPending, apiCallRejected, apiCallFullfilled } from "~/store/utils";

const PAGE_URL = "/maintenance/working-hours/overview";

interface WorkingHoursState {
  downtimeByHour: {
    status: Status;
    error: string;
    data: {
      previousWeek: number[];
      currentWeek: number[];
    };
  };
  downtimeCauses: {
    status: Status;
    error: string;
    data: {
      cause: string;
      time: number;
    }[];
  };
  downtimeErrors: {
    status: Status;
    error: string;
    data: {
      cause: string;
      time: number;
    }[];
  };
  downtimeByWeekday: {
    status: Status;
    error: string;
    data: {
      mon: number[];
      tue: number[];
      wed: number[];
      thu: number[];
      fri: number[];
      sat: number[];
      sun: number[];
    };
    filters: {
      timeStart: number;
      timeEnd: number;
    };
  };
  downtimeByWeek: {
    status: Status;
    error: string;
    data: {
      previous: number;
      current: number;
    };
  };
  downtimeByBuisnessUnit: {
    status: Status;
    error: string;
    data: {
      name: string;
      downtime: number;
    }[]
  };
}

const initialState: WorkingHoursState = {
  downtimeByHour: {
    status: 'idle',
    error: "",
    data: {
      previousWeek: [],
      currentWeek: [],
    },
  },
  downtimeCauses: {
    status: 'idle',
    error: "",
    data: [],
  },
  downtimeErrors: {
    status: 'idle',
    error: "",
    data: [],
  },
  downtimeByWeekday: {
    status: 'idle',
    error: "",
    data: {
      mon: [],
      tue: [],
      wed: [],
      thu: [],
      fri: [],
      sat: [],
      sun: [],  
    },
    filters: {
      timeStart: 0,
      timeEnd: 24,
    },
  },
  downtimeByWeek: {
    status: 'idle',
    error: "",
    data: {
      previous: 0,
      current: 0,
    },
  },
  downtimeByBuisnessUnit: {
    status: 'idle',
    error: "",
    data: [],
  },
}

export const fetchDowntimeByHour = 
  createCustomAsyncThunk("post", PAGE_URL + "/downtime-by-hour");
export const fetchDowntimeCauses = 
  createCustomAsyncThunk("post", PAGE_URL + "/downtime-causes");
export const fetchDowntimeErrors = 
  createCustomAsyncThunk("post", PAGE_URL + "/downtime-errors");
export const fetchDowntimeByWeekday = 
  createCustomAsyncThunk("post", PAGE_URL + "/downtime-by-weekday");
export const fetchDowntimeByWeek = 
  createCustomAsyncThunk("post", PAGE_URL + "/downtime-by-week");
export const fetchDowntimeByPath = 
  createCustomAsyncThunk("post", PAGE_URL + "/downtime-by-business-unit");

const apiCallPending = (prop: keyof WorkingHoursState) => (state: WorkingHoursState, action: { type: string; payload: any; }) => {
  state[prop].status = 'loading';
};

const apiCallRejected = (prop: keyof WorkingHoursState) => (state: WorkingHoursState, action: { type: string; payload: any; }) => {
  state[prop].status = 'error';
  // @ts-ignore
  const { message } = action.error;
  if (message) state[prop].error = message;
};

const apiCallFullfilled = (prop: keyof WorkingHoursState) => (state: WorkingHoursState, action: { type: string; payload: any; }) => {
  state[prop].status = 'success';
  state[prop].data = action.payload[prop];
};

const slice = createSlice({
  name: 'working-hours',
  initialState,
  reducers: {
    timeSet: (state, action) => {
      console.log(action.payload);

      const { timeStart, timeEnd } = action.payload;
      if (typeof timeStart === 'number') 
        state.downtimeByWeekday.filters.timeStart = timeStart;
      if (typeof timeEnd === 'number')
        state.downtimeByWeekday.filters.timeEnd = timeEnd;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchDowntimeByHour.pending, apiCallPending('downtimeByHour'))
      .addCase(fetchDowntimeByHour.fulfilled, apiCallFullfilled('downtimeByHour'))
      .addCase(fetchDowntimeByHour.rejected, apiCallRejected('downtimeByHour'))
    
      .addCase(fetchDowntimeCauses.pending, apiCallPending('downtimeCauses'))
      .addCase(fetchDowntimeCauses.fulfilled, apiCallFullfilled('downtimeCauses'))
      .addCase(fetchDowntimeCauses.rejected, apiCallRejected('downtimeCauses'))

      .addCase(fetchDowntimeErrors.pending, apiCallPending('downtimeErrors'))
      .addCase(fetchDowntimeErrors.fulfilled, apiCallFullfilled('downtimeErrors'))
      .addCase(fetchDowntimeErrors.rejected, apiCallRejected('downtimeErrors'))

      .addCase(fetchDowntimeByWeekday.pending, apiCallPending('downtimeByWeekday'))
      .addCase(fetchDowntimeByWeekday.fulfilled, apiCallFullfilled('downtimeByWeekday'))
      .addCase(fetchDowntimeByWeekday.rejected, apiCallRejected('downtimeByWeekday'))
      
      .addCase(fetchDowntimeByWeek.pending, apiCallPending('downtimeByWeek'))
      .addCase(fetchDowntimeByWeek.fulfilled, apiCallFullfilled('downtimeByWeek'))
      .addCase(fetchDowntimeByWeek.rejected, apiCallRejected('downtimeByWeek'))

      .addCase(fetchDowntimeByPath.pending, apiCallPending('downtimeByBuisnessUnit'))
      .addCase(fetchDowntimeByPath.fulfilled, apiCallFullfilled('downtimeByBuisnessUnit'))
      .addCase(fetchDowntimeByPath.rejected, apiCallRejected('downtimeByBuisnessUnit'))
  },
})

export const { timeSet } = slice.actions;
export default slice.reducer;