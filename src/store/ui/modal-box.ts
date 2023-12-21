import { createSlice } from "@reduxjs/toolkit"
import { ICoffeeMachine } from "~/interfaces/entities";

export type ModalBoxTab = "general" | "location" | "monitoring" | "events-history" | "maintenance" | "spare-parts";

interface State {
  visibility: boolean;
  // page: "coffee-machine" | "restaurant" | "business-unit";
  tab: ModalBoxTab;
  coffeeMachine: ICoffeeMachine | null;
}

const initialState: State = {
  visibility: false,
  // page: "coffee-machine",
  tab: "general",
  coffeeMachine: null,
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

    coffeeMachineSet: (state, action: { type: string; payload: ICoffeeMachine; }) => {
      state.coffeeMachine = action.payload;
    },
  }
});

export const { visibilitySet, tabSet, coffeeMachineSet } = slice.actions;
export default slice.reducer;