import { combineReducers } from "@reduxjs/toolkit";
import companyStructureReducer from './company-structure';
import machinesReducer from './machines';

const administrationReducer = combineReducers({
  companyStructure: companyStructureReducer,
  machines: machinesReducer,
});

export default administrationReducer;

