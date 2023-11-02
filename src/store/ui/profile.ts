import { createSlice } from "@reduxjs/toolkit"

interface Profile {
  firstName: string;
  lastName: string;
  email: string;
  displayPopup: boolean;
}

const initialState: Profile = {
  firstName: "Николай",
  lastName: "Лазарев",
  email: "lazarev.n.f@outlook.com",
  displayPopup: false,
};

const slice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    popupToggled: (profile, action) => {
      const displayPopup = action.payload.display 
        ? action.payload.display
        : !profile.displayPopup
      profile.displayPopup = displayPopup;
    },
  }
});

export const { popupToggled } = slice.actions;
export default slice.reducer;