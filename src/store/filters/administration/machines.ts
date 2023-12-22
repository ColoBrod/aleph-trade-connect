import { createSlice } from "@reduxjs/toolkit";
import { IFilters_Administration_Machines } from "~/interfaces/filters";
import InitialFilters from "~/store/filters/initial";
import { 
  _businessUnitsSet,
  _businessUnitsExpanded,
  _businessUnitsFilterChanged,
  _businessUnitsSelectedAll,
  _coffeeMachineModelSelected,
  _coffeeMachineModelSearched,
  _serialNumberAdded,
  _serialNumberRemoved,
  _serialNumbersRemovedAll,
  _rowsPerPageSet,
  _activePageSet,
  _orderBySet,
} from "~/store/filters/utils";

const state = new InitialFilters('administration/machines');
const initialState = { ...state } as IFilters_Administration_Machines;

const slice = createSlice({
  name: 'machines',
  initialState,
  reducers: {
    businessUnitsSet: _businessUnitsSet,
    businessUnitsExpanded: _businessUnitsExpanded,
    businessUnitsFilterChanged: _businessUnitsFilterChanged,
    businessUnitsSelectedAll: _businessUnitsSelectedAll,
    coffeeMachineModelSelected: _coffeeMachineModelSelected,
    coffeeMachineModelSearched: _coffeeMachineModelSearched,
    serialNumberAdded: _serialNumberAdded,
    serialNumberRemoved: _serialNumberRemoved,
    serialNumbersRemovedAll: _serialNumbersRemovedAll,
    rowsPerPageSet: _rowsPerPageSet,
    activePageSet: _activePageSet,
    orderBySet: _orderBySet,
  },
});

export const { 
  businessUnitsSet, 
  businessUnitsExpanded,
  businessUnitsFilterChanged,
  businessUnitsSelectedAll,
  coffeeMachineModelSelected,
  coffeeMachineModelSearched,
  serialNumberAdded,
  serialNumberRemoved,
  serialNumbersRemovedAll,
  rowsPerPageSet,
  activePageSet,
  orderBySet,
} = slice.actions;
export default slice.reducer;