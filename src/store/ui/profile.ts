import { createSlice } from "@reduxjs/toolkit"

interface Profile {
  firstName: string;
  lastName: string;
  email: string;
  displayPopup: boolean;
  uploadImage: {
    display: 'flex' | 'none';
  };
}

const initialState: Profile = {
  firstName: "Николай",
  lastName: "Лазарев",
  email: "lazarev.n.f@outlook.com",
  displayPopup: false,
  uploadImage: {
    display: 'flex',
  },
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
    uploadImageToggled: (state, action: {
      type: string;
      payload: boolean;
    }) => {
      const display = action.payload === true ? 'flex' : 'none';
      state.uploadImage.display = display;
    },
  }
});

export const { popupToggled, uploadImageToggled } = slice.actions;
export default slice.reducer;