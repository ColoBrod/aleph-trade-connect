import { createSlice } from "@reduxjs/toolkit"

interface State {
  visible: boolean;
}

const initialState: State = {
  visible: true,
};

const slice = createSlice({
  name: 'filters-aside',
  initialState,
  reducers: {
    visibilitySet: (state, action) => {
      const isVisible = action.payload;
      if (isVisible === undefined) state.visible = !state.visible;
      else state.visible = isVisible;
    },
  }
});

export const { visibilitySet } = slice.actions;
export default slice.reducer;