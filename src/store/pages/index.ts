import { combineReducers } from "redux";
import analyticsReducer from "./analytics";
import authReducer from './auth';
import maintenanceReducer from "./maintenance";
import modalBoxReducer from "./modal-box";
import administrationReducer from "./administration";

const pagesReducer = combineReducers({
  auth: authReducer,
  analytics: analyticsReducer,
  maintenance: maintenanceReducer,
  administration: administrationReducer,
  modalBox: modalBoxReducer,
});

export default pagesReducer;  