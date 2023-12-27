// import { createSlice } from "@reduxjs/toolkit";
// import type { PayloadAction } from '@reduxjs/toolkit'

// export interface RoutesState {
//   "/analytics": "trends" | "dayly-reports" | "data-export";
//   "/maintenance": "";
//   "/administration": "";
//   "/map": "";
//   "/docs": "";
//   // "/analytics/trends/overview": string;
//   // "/analytics/dayly-reports": string;
// }

// interface Payload {
//   path: keyof RoutesState; 
//   tab: RoutesState[keyof RoutesState];
// }

// const initialState: RoutesState = {
//   "/analytics": "trends",

// }

// const slice = createSlice({
//   name: 'tabs',
//   initialState,
//   reducers: {
//     tabSet: (state, action: PayloadAction<Payload>) => {
//       const { path, tab } = action.payload;
//       state[path] = tab;
//       // state["/analytics"] = "13";
//     }
//   },
// })

// export default slice.reducer;