import { createSlice } from "@reduxjs/toolkit"

export type ModalBoxTab = "general" | "location" | "monitoring" | "events-history" | "maintenance" | "spare-parts" 

interface State {
  visibility: boolean;
  page: "coffee-machine" | "restaurant" | "business-unit";
  tab: ModalBoxTab;
}

const initialState: State = {
  visibility: true,
  page: "coffee-machine",
  tab: "monitoring",
};

const slice = createSlice({
  name: 'modal-box',
  initialState,
  reducers: {
    visibilitySet: (state, action: { type: string; payload: boolean; }) => {
      if (action.payload === undefined) state.visibility = !state.visibility;
      else state.visibility = action.payload;
    },
    tabSet: (state, action: { type: string; payload: ModalBoxTab; }) => {
      const tab = action.payload;
      state.tab = tab;
    },

  }
});

export const { visibilitySet, tabSet } = slice.actions;
export default slice.reducer;