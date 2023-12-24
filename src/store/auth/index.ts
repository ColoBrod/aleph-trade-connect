import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios, { AxiosError, AxiosResponse } from "axios";
// import { createCustomAsyncThunk } from "~/services/custom-async-thunk";

import { Status } from "~/interfaces/common";

// export const 

interface Auth {
  status: Status;
  user: {
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    utc: string;
  } | null,
  token: string;
}

const initialState: Auth = {
  status: 'idle',
  user: null,
  token: "",
}

const token = localStorage.getItem("token");
const userSerialized = localStorage.getItem("user");
if (token) {
  initialState.token = token;
  initialState.user = userSerialized ? JSON.parse(userSerialized) : null;
}

const slice = createSlice({
  name: 'entities',
  initialState,
  reducers: {
  }, 
  extraReducers(builder) {
    
      
    // builder
      // .addCase(fetchEntities.pending, apiCallPending)
      // .addCase(fetchEntities.fulfilled, (state, action) => {
      //   state.data = action.payload;
      // })
      // .addCase(fetchEntities.rejected, apiCallRejected)
  }
});

export default slice.reducer;