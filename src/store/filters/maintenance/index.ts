import { combineReducers, createSlice } from "@reduxjs/toolkit";
import { IFilters_Maintenance } from "~/interfaces/filters";
import InitialFilters from "~/store/filters/initial";
import { 
  _businessUnitsSet, 
  _businessUnitsExpanded, 
  _businessUnitsFilterChanged,
  _businessUnitsSelectedAll,
  _coffeeMachineModelSelected,
  _errorToggled,
  _errorsSelected,
  _errorsUnselected,
} from "~/store/filters/utils";

import monitoringReducer from './monitoring';
import dataExportReducer from './data-export';

const state = new InitialFilters('maintenance');
export const initialState = { ...state } as IFilters_Maintenance;

const slice = createSlice({
  name: 'maintenance',
  initialState,
  reducers: {
    businessUnitsSet: _businessUnitsSet,
    businessUnitsExpanded: _businessUnitsExpanded,
    businessUnitsFilterChanged: _businessUnitsFilterChanged,
    businessUnitsSelectedAll: _businessUnitsSelectedAll,
    coffeeMachineModelSelected: _coffeeMachineModelSelected,
    errorToggled: _errorToggled,
    errorsSelected: _errorsSelected,
    errorsUnselected: _errorsUnselected,
  },
});

const reducer = combineReducers({
  shared: slice.reducer,
  monitoring: monitoringReducer,
  dataExport: dataExportReducer,
  // daylyReports: daylyReportsReducer,
  // trends: trendsReducer,
  // dataExport: dataExportReducer,
});

export const {
  businessUnitsSet,
  businessUnitsExpanded,
  businessUnitsFilterChanged,
  businessUnitsSelectedAll,
  coffeeMachineModelSelected,
  errorToggled,
  errorsSelected,
  errorsUnselected,
} = slice.actions;

export default reducer;  