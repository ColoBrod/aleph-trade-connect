import { createSlice } from "@reduxjs/toolkit";

interface State {
  display: 'logo' | 'login';
}

const initialState: State = {
  display: 'login',
}

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    displaySet: (state, action) => {
      state.display = action.payload;
    }
  },
})

export const { displaySet } = slice.actions;
export default slice.reducer;