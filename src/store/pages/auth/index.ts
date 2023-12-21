import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError, AxiosResponse } from "axios";
export type Step = 'phone' | 'phone-password' | 'phone-sms-code' | 'set-password';
const PAGE_URL_LOGIN = process.env.NODE_ENV === 'production'
  ? "http://demo.wmf24.ru:9000/api/login"
  : "http://localhost:9000/api/login";
const PAGE_URL_REGISTER = process.env.NODE_ENV === 'production'
  ? "http://demo.wmf24.ru:9000/api/register"
  : "http://localhost:9000/api/register";

interface State {
  status: 'idle' | 'redirect';
  display: 'logo' | 'login';
  step: Step;
  notification: {
    type: "message" | "error";
    input: string;
    text: string;
  } | null;

  // error: '' 
  //   | 'Такой номер не зарегистрирован в системе'
  //   | 'Неверный пароль'
  // phone: string;
  // smsCode: string;
  // password: string;
}

const initialState: State = {
  status: 'idle',
  display: 'login',
  step: 'phone',
  notification: null,
  // phone: '',
  // smsCode: '',
  // password: '',
}

export type LoginData = {
  step: Step;
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
    return {
      status: response.status,
      data: response.data,
    };
    // return { status: response.status, message: response.data.message };
  } 
  catch (e) {
    // if (!axios.isAxiosError(error))
    const error = e as AxiosError;
    const response = error.response as AxiosResponse;
    return {
      status: response.status,
      data: response.data,
    };
    // @ts-ignore

    // return { status: response.status, message: response.data.error };

    // return error;
    // return { status: error.status, message: error.data.message };
    // if (error?.response) res = err.response;
    // response = e;
  }
  // @ts-ignore
  // return res;
  // return ({ status: res.status, message: res.data. });
})

export const register = createAsyncThunk('auth/register', async (data: LoginData) => {
  const config = {
    url: PAGE_URL_REGISTER,
    method: "post",
    data,
  }

})

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    displaySet: (state, action) => {
      state.display = action.payload;
    },
    stepSet: (state, action: { type: string; payload: Step; }) => {
      state.step = action.payload;
    },
    // Form inputs
    // phoneSet: (state, action) => {
    //   state.phone = action.payload;
    // },
    // smsCodeSet: (state, action) => {
    //   state.phone = action.payload;
    // },
    // passwordSet: (state, action) => {
    //   state.phone = action.payload;
    // },
  },
  extraReducers(builder) {
    builder
      .addCase(login.pending, (state, action) => {

      })
      .addCase(login.fulfilled, (state, action) => {
        const { status, data } = action.payload;
        const { inputField, message, error, nextStep, user, token } = data;
        if (token) {
          console.log("AUthorized! Redirecting...");
          const userSerialized = JSON.stringify(user);
          localStorage.setItem("token", token);
          localStorage.setItem("user", userSerialized);
          state.status = 'redirect';
          return;
        }
        if (nextStep) state.step = nextStep;
        if (inputField && (error || message)) {
          state.notification = {
            input: inputField,
            text: message ? message : error,
            type: message ? 'message' : 'error',
          };
          // state.notification.input = inputField;
          // state.notification.text = message ? message : error;
          // state.notification.type = message ? 'message' : 'error';
        }
        console.log("Next step:", nextStep)


        // console.log(action.payload);
        // if (status === 200) {
          
        // }
        // else {

        // }
      })
      .addCase(login.rejected, (state, action) => {

      })
  }

  
})

export const { displaySet, stepSet } = slice.actions;
export default slice.reducer;
