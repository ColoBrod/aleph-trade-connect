import { createSlice } from "@reduxjs/toolkit";

type Step = 'phone' | 'phone-password' | 'phone-sms-code' | 'set-password';

interface State {
  display: 'logo' | 'login';
  step: Step;
  // error: '' 
  //   | 'Такой номер не зарегистрирован в системе'
  //   | 'Неверный пароль'
  // phone: string;
  // smsCode: string;
  // password: string;
}

const initialState: State = {
  display: 'login',
  step: 'phone',
  // phone: '',
  // smsCode: '',
  // password: '',
}

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
})

export const { displaySet, stepSet } = slice.actions;
export default slice.reducer;
