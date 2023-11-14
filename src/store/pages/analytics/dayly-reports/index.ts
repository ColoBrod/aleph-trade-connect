import { createSlice } from "@reduxjs/toolkit";
import { createCustomAsyncThunk } from "~/services/custom-async-thunk";
import { Status } from '~/interfaces/common';

const PAGE_URL = "/analytics/dayly-reports";

export const fetchDispensingsByRestaurant = 
  createCustomAsyncThunk("post", PAGE_URL + "/dispensings-by-restaurant");

export const fetchCleaningsByRestaurant = 
  createCustomAsyncThunk("post", PAGE_URL + "/cleanings-by-restaurant");

export const fetchDispensingsByHour = 
  createCustomAsyncThunk("post", PAGE_URL + "/dispensings-by-hour");

export const fetchDispensingsByWeekday = 
  createCustomAsyncThunk("post", PAGE_URL + "/dispensings-by-weekday");

export const fetchDispensingsByRecipe = 
  createCustomAsyncThunk("post", PAGE_URL + "/dispensings-by-recipe");

export const fetchDispensingsByCupSize = 
  createCustomAsyncThunk("post", PAGE_URL + "/dispensings-by-cup-size");

interface DaylyReportsState {
  dispensingsByRestaurant: {
    status: Status;
    error: string;
    data: {
      name: string;
      dispensings: number;
    }[];
  };
  cleaningsByRestaurant: {
    status: Status;
    error: string;
    data: {
      name: string;
      cleanings: number;
    }[];
  };
  dispensingsByHour: {
    status: Status;
    error: string;
    data: {
      hour: string;
      dispensings: number;
    }[]; 
  };
  dispensingsByWeekday: {
    status: Status;
    error: string;
    data: {
      mon: number,
      tue: number,
      wed: number,
      thu: number,
      fri: number,
      sat: number,
      sun: number,
    };
  };
  dispensingsByRecipe: {
    status: Status;
    error: string;
    data: {
      recipe: string;
      dispensings: number;
    }[];
  };
  dispensingsByCupSize: {
    status: Status;
    error: string;
    data: {
      cupSize: string;
      dispensings: number;
    }[];
  };
}

const initialState: DaylyReportsState = {
  dispensingsByRestaurant: {
    status: 'idle',
    error: "",
    data: [],
  },
  cleaningsByRestaurant: {
    status: 'idle',
    error: "",
    data: [],
  },
  dispensingsByHour: {
    status: 'idle',
    error: "",
    data: [],
  },
  dispensingsByWeekday: {
    status: 'idle',
    error: "",
    data: {
      mon: 0,
      tue: 0,
      wed: 0,
      thu: 0,
      fri: 0,
      sat: 0,
      sun: 0,
    },
  },
  dispensingsByRecipe: {
    status: 'idle',
    error: "",
    data: [],
  },
  dispensingsByCupSize: {
    status: 'idle',
    error: "",
    data: [],
  },
}

const slice = createSlice({
  name: 'daylyReports',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchDispensingsByRestaurant.pending, (state, action) => {
        state.dispensingsByRestaurant.status = 'loading';
      })
      .addCase(fetchDispensingsByRestaurant.fulfilled, (state, action) => {
        state.dispensingsByRestaurant.status = 'success';
        const { dispensingsByRestaurant } = action.payload;
        state.dispensingsByRestaurant.data = dispensingsByRestaurant;
      })
      .addCase(fetchDispensingsByRestaurant.rejected, (state, action) => {
        state.dispensingsByRestaurant.status = 'error';
        const { message } = action.error;
        if (message) state.dispensingsByRestaurant.error = message;
      })
      
      .addCase(fetchCleaningsByRestaurant.pending, (state, action) => {
        state.cleaningsByRestaurant.status = 'loading';
      })
      .addCase(fetchCleaningsByRestaurant.fulfilled, (state, action) => {
        state.cleaningsByRestaurant.status = 'success';
        const { cleaningsByRestaurant } = action.payload;
        state.cleaningsByRestaurant.data = cleaningsByRestaurant;
      })
      .addCase(fetchCleaningsByRestaurant.rejected, (state, action) => {
        state.cleaningsByRestaurant.status = 'error';
        const { message } = action.error;
        if (message) state.cleaningsByRestaurant.error = message;
      })

      .addCase(fetchDispensingsByHour.pending, (state, action) => {
        state.dispensingsByHour.status = 'loading';
      })
      .addCase(fetchDispensingsByHour.fulfilled, (state, action) => {
        state.dispensingsByHour.status = 'success';
        const { dispensingsByHour } = action.payload;
        state.dispensingsByHour.data = dispensingsByHour;
      })
      .addCase(fetchDispensingsByHour.rejected, (state, action) => {
        state.dispensingsByHour.status = 'error';
        const { message } = action.error;
        if (message) state.dispensingsByHour.error = message;
      })

      .addCase(fetchDispensingsByWeekday.pending, (state, action) => {
        state.dispensingsByWeekday.status = 'loading';
      })
      .addCase(fetchDispensingsByWeekday.fulfilled, (state, action) => {
        state.dispensingsByWeekday.status = 'success';
        const { dispensingsByWeekday } = action.payload;
        state.dispensingsByWeekday.data = dispensingsByWeekday;
      })
      .addCase(fetchDispensingsByWeekday.rejected, (state, action) => {
        state.dispensingsByWeekday.status = 'error';
        const { message } = action.error;
        if (message) state.dispensingsByWeekday.error = message;
      })

      .addCase(fetchDispensingsByRecipe.pending, (state, action) => {
        state.dispensingsByRecipe.status = 'loading';
      })
      .addCase(fetchDispensingsByRecipe.fulfilled, (state, action) => {
        state.dispensingsByRecipe.status = 'success';
        const { dispensingsByRecipe } = action.payload;
        state.dispensingsByRecipe.data = dispensingsByRecipe;
      })
      .addCase(fetchDispensingsByRecipe.rejected, (state, action) => {
        state.dispensingsByRecipe.status = 'error';
        const { message } = action.error;
        if (message) state.dispensingsByRecipe.error = message;
      })

      .addCase(fetchDispensingsByCupSize.pending, (state, action) => {
        state.dispensingsByCupSize.status = 'loading';
      })
      .addCase(fetchDispensingsByCupSize.fulfilled, (state, action) => {
        state.dispensingsByCupSize.status = 'success';
        const { dispensingsByCupSize } = action.payload;
        state.dispensingsByCupSize.data = dispensingsByCupSize;
      })
      .addCase(fetchDispensingsByCupSize.rejected, (state, action) => {
        state.dispensingsByCupSize.status = 'error';
        const { message } = action.error;
        if (message) state.dispensingsByCupSize.error = message;
      })
  },
})

export default slice.reducer;