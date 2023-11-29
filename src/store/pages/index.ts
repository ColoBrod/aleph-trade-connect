import { combineReducers } from "redux";
import analyticsReducer from "./analytics";
import authReducer from './auth';
import maintenanceReducer from "./maintenance";

const pagesReducer = combineReducers({
  auth: authReducer,
  analytics: analyticsReducer,
  maintenance: maintenanceReducer,
});

export default pagesReducer;  