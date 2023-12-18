import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios";
// import { createCustomAsyncThunk } from "~/services/custom-async-thunk";
import { apiCallPending, apiCallRejected } from "~/store/utils";
const PAGE_URL_LOGIN = "http://localhost:9000/auth/login";
const PAGE_URL_REGISTER = "http://localhost:9000/auth/register";
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

export type LoginData = {
  phone: string;
  password?: string;
  code?: string;
}

export const login = createAsyncThunk('auth/login', async (data: LoginData) => {
  const config = {
    url: PAGE_URL_LOGIN,
    method: "post",
    data,
  }
  const response = await axios(config);
  return response;
})

const slice = createSlice({
  name: 'entities',
  initialState,
  reducers: {
  }, 
  extraReducers(builder) {
    builder
      .addCase(login.pending, (state, action) => {

      })
      .addCase(login.fulfilled, (state, action) => {
        console.log(action.payload);
      })
      .addCase(login.rejected, (state, action) => {

      })
      
    // builder
      // .addCase(fetchEntities.pending, apiCallPending)
      // .addCase(fetchEntities.fulfilled, (state, action) => {
      //   state.data = action.payload;
      //   console.log("ENTITIES: ", action.payload);
      // })
      // .addCase(fetchEntities.rejected, apiCallRejected)
  }
});

export default slice.reducer;