import { createSlice } from "@reduxjs/toolkit";

interface Coords {
  x: number;
  y: number;
}

type Place = 'bottom' | 'top' | 'left' | 'right';

interface ITooltipState {
  coords: Coords;
  text: string;
  visibility: 'hidden' | 'visible';
  place: Place;
}

const initialState: ITooltipState = {
  coords: { x: 0, y: 0 },
  text: "",
  visibility: "hidden",
  place: 'right',
}

const slice = createSlice({
  name: "tooltip",
  initialState,
  reducers: {
    tooltipHid: (state) => {
      state.visibility = "hidden";
    },
    tooltipShown: (
      state,
      action: {
        type: string;
        payload: { coords: Coords; text: string; place?: Place };
      }
    ) => {
      const { coords, text, place } = action.payload;
      state.coords = coords;
      state.text = text;
      state.place = place === undefined ? 'right' : place;
      state.visibility = 'visible';
    },
  },
});

export const { tooltipHid, tooltipShown } = slice.actions;
export default slice.reducer;

// const

