import { combineReducers } from "@reduxjs/toolkit";
import monitoringReducer from './monitoring';

const modalBoxReducer = combineReducers({
  monitoring: monitoringReducer,
});

export default modalBoxReducer;