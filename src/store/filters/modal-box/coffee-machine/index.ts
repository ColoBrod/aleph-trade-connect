import { combineReducers } from "@reduxjs/toolkit";
import monitoringReducer from './monitoring';
import eventsHistoryReducer from "./events-history";

const modalBoxReducer = combineReducers({
  monitoring: monitoringReducer,
  eventsHistory: eventsHistoryReducer,
});

export default modalBoxReducer;