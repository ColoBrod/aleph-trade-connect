import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from 'axios';
import config from "~/config";

import { Status } from '~/interfaces/common';

const BASE_URL = config.api.url + "/analytics/trends/sales";

interface SalesState {
  dispensingsByDate: {
    status: Status;
    error: string;
    data: {
      date: string;
      dispensings: number;
    }[];
  };
  dispensingsByCupSize: {
    status: Status;
    error: string;
    data: {
      cupSize: "S" | "M" | "L";
      dispensings: number;
    }[];
  };
  dispensingsByRecipe: {
    status: Status;
    error: string;
    data: {
      recipe: string;
      dispensings: number;
    }[];
  };
  dispensingsByWeekdayAndTime: {
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
    }
  };
  dispensingsByWeek: {
    status: Status;
    error: string;
    data: {
      previous: number;
      current: number;
    };
  };
  dispensingsByPath: {
    status: Status;
    error: string;
    data: {
      name: string;
      dispensings: number;
    }[];
  };
}

const initialState: SalesState = {
  dispensingsByDate: {
    status: 'idle',
    error: "",
    data: [],
  },
  dispensingsByCupSize: {
    status: 'idle',
    error: "",
    data: [],
  },
  dispensingsByRecipe: {
    status: 'idle',
    error: "",
    data: [],
  },
  dispensingsByWeekdayAndTime: {
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
    }
  },
  dispensingsByWeek: {
    status: 'idle',
    error: "",
    data: {
      previous: 0,
      current: 0,
    }
  },
  dispensingsByPath: {
    status: 'idle',
    error: "",
    data: [],
  },
};

export const fetchDispensingsByDate = createAsyncThunk('analytics/trends/sales/dispensings-by-date', async () => {
  const response = await axios.post(BASE_URL + '/dispensings-by-date');
  return response.data;
});

export const fetchDispensingsByCupSize = createAsyncThunk('analytics/trends/sales/dispensings-by-cup-size', async () => {
  const response = await axios.post(BASE_URL + '/dispensings-by-cup-size');
  return response.data;
});

export const fetchDispensingsByRecipe = createAsyncThunk('analytics/trends/sales/dispensings-by-recipe', async () => {
  const response = await axios.post(BASE_URL + '/dispensings-by-recipe');
  return response.data;
});

export const fetchDispensingsByWeekdayAndTime = createAsyncThunk('analytics/trends/sales/dispensings-by-weekday-and-time', async () => {
  const response = await axios.post(BASE_URL + '/dispensings-by-weekday-and-time');
  return response.data;
});

export const fetchDispensingsByWeek = createAsyncThunk('analytics/trends/sales/dispensings-previous-vs-current', async () => {
  const response = await axios.post(BASE_URL + '/dispensings-previous-vs-current');
  return response.data;
});

export const fetchDispensingsByPath = createAsyncThunk('analytics/trends/sales/dispensings-by-path', async () => {
  const response = await axios.post(BASE_URL + '/dispensings-by-path');
  return response.data;
});

const slice = createSlice({
  name: 'overview',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchDispensingsByDate.pending, (state, action) => {
        state.dispensingsByDate.status = 'loading';
      })
      .addCase(fetchDispensingsByDate.fulfilled, (state, action) => {
        state.dispensingsByDate.status = 'success';
        const { dispensingsByDate } = action.payload;
        state.dispensingsByDate.data = dispensingsByDate;
      })
      .addCase(fetchDispensingsByDate.rejected, (state, action) => {
        state.dispensingsByDate.status = 'error';
        const { message } = action.error;
        if (message) state.dispensingsByDate.error = message;
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
  },
});

export default slice.reducer;