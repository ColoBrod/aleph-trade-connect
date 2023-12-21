import { createSlice } from "@reduxjs/toolkit";

import InitialFilters from "~/store/filters/initial";
import { IFilters_ModalBox_CoffeeMachine_Monitoring } from "~/interfaces/filters";
import { _activePageSet, _rowsPerPageSet, _orderBySet } from "~/store/filters/utils";

const state = new InitialFilters('modal-box/coffee-machine/monitoring');
export const initialState = { ...state } as IFilters_ModalBox_CoffeeMachine_Monitoring;

const slice = createSlice({
  name: 'monitoring',
  initialState,
  reducers: {
    activePageSet: _activePageSet,
    rowsPerPageSet: _rowsPerPageSet,
    orderBySet: _orderBySet,
  },
});

export const { activePageSet, rowsPerPageSet, orderBySet } = slice.actions;
export default slice.reducer;
