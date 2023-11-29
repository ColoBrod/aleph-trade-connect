import { combineReducers, createSlice } from "@reduxjs/toolkit";
import { IFilters_Maintenance } from "~/interfaces/filters";
import InitialFilters from "~/store/filters/initial";
import { 
  _businessUnitsSet, 
  _businessUnitsExpanded, 
  _businessUnitsFilterChanged,
  _coffeeMachineModelSelected,
  _errorToggled,
} from "~/store/filters/utils";

import monitoringReducer from './monitoring';

const state = new InitialFilters('maintenance');
export const initialState = { ...state } as IFilters_Maintenance;

const slice = createSlice({
  name: 'maintenance',
  initialState,
  reducers: {
    businessUnitsSet: _businessUnitsSet,
    businessUnitsExpanded: _businessUnitsExpanded,
    businessUnitsFilterChanged: _businessUnitsFilterChanged,
    coffeeMachineModelSelected: _coffeeMachineModelSelected,
    errorToggled: _errorToggled,
  },
});

const reducer = combineReducers({
  shared: slice.reducer,
  monitoring: monitoringReducer,
  // daylyReports: daylyReportsReducer,
  // trends: trendsReducer,
  // dataExport: dataExportReducer,
});

export const {
  businessUnitsSet,
  businessUnitsExpanded,
  businessUnitsFilterChanged,
  coffeeMachineModelSelected,
  errorToggled,
} = slice.actions;

export default reducer;  