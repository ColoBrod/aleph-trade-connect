import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios, { AxiosError, AxiosResponse } from "axios";
// import { createCustomAsyncThunk } from "~/services/custom-async-thunk";
import { apiCallPending, apiCallRejected } from "~/store/utils";
const PAGE_URL_LOGIN = "http://localhost:9000/api/login";
const PAGE_URL_REGISTER = "http://localhost:9000/api/register";
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
  try {
    const response = await axios(config);
    return { status: response.status, message: response.data.message };
  } 
  catch (e) {
    // if (!axios.isAxiosError(error))
    const error = e as AxiosError;
    const { response } = error;
    // @ts-ignore
    return { status: response.status, message: response.data.error };
    // return error;
    // return { status: error.status, message: error.data.message };
    // if (error?.response) res = err.response;
    // response = e;
  }
  // @ts-ignore
  // return res;
  // return ({ status: res.status, message: res.data. });
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