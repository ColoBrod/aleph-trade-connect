import { createSlice } from "@reduxjs/toolkit";

interface State {
  modalBox: {
    isVisible: boolean;
  };
  businessUnitId: string;
  userId: string;
}

const initialState: State = {
  modalBox: {
    isVisible: false,
  },
  businessUnitId: "",
  userId: "",
}

const slice = createSlice({
  name: 'company-structure',
  initialState,
  reducers: {
    modalBoxToggled: (state, action) => {
      const isVisible = action.payload;
      if (isVisible) state.modalBox.isVisible = isVisible;
      else state.modalBox.isVisible = !state.modalBox.isVisible;
    },
    businessUnitSet: (state, action) => {
      state.businessUnitId = action.payload;
    },
    userSet: (state, action) => {
      state.userId = action.payload;
    },
  },
  extraReducers(builder) {

  },
});

export const { modalBoxToggled, businessUnitSet, userSet } = slice.actions;
export default slice.reducer;
