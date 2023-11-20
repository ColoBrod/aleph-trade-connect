import { createSlice } from "@reduxjs/toolkit"

interface CalendarState {
  id: string;
  date: string;
  visible: boolean;
  x: number;
  y: number;
  month: number;
  year: number;
}

const initialState: CalendarState = {
  visible: false,
  x: 0,
  y: 0,
  date: "01/01/2023",
  id: "",
  month: 0,
  year: 2023
};

const slice = createSlice({
  name: 'calendar', 
  initialState,
  reducers: {
    monthSet: (state, action) => {
      const { month } = action.payload;
      state.month = month;
      // Object.assign(state, month);
    },
    yearSet: (state, action) => {
      const { year } = action.payload;
      state.year = year;
      // Object.assign(state, year);
    },
    displaySet: (state, action) => {
      let { visible, x = 0, y = 0, date = "01/01/2023", id = "" } = action.payload;
      // const visible = !state.visible;
      if (visible === false) {
        state.visible = false;
        return;
      }
      if (visible === undefined) visible = !state.visible;
      const [mm, dd, yyyy] = date.split("/").map((el: string) => parseInt(el));
      const tempDate = new Date(yyyy, mm-1, dd)
      Object.assign(state, { visible, x, y, date, id, month: tempDate.getMonth(), year: tempDate.getFullYear() });
    }
  }
});

export const { displaySet, monthSet, yearSet } = slice.actions;
export default slice.reducer;