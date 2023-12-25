import { combineReducers } from "redux";
import monitoringReducer from "./monitoring";
import eventsHistoryReducer from './events-history';

const modalBoxReducer = combineReducers({
  monitoring: monitoringReducer,
  eventsHistory: eventsHistoryReducer,
});

export default modalBoxReducer;  