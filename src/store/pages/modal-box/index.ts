import { combineReducers } from "redux";
import monitoringReducer from "./monitoring";

const modalBoxReducer = combineReducers({
  monitoring: monitoringReducer,
});

export default modalBoxReducer;  