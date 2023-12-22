import { combineReducers } from "@reduxjs/toolkit";
import machinesReducer from './machines';
import companyStructureReducer from './machines';

const administrationReducer = combineReducers({
  machines: machinesReducer,
  companyStructure: companyStructureReducer,
});

export default administrationReducer;