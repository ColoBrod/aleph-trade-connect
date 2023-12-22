import { combineReducers } from "redux";
import analyticsReducer from "./analytics";
import maintenanceReducer from "./maintenance";
import administrationReducer from "./administration";
import modalBoxReducer from "./modal-box";

const reducer = combineReducers({
  analytics: analyticsReducer,
  maintenance: maintenanceReducer,
  administration: administrationReducer,
  modalBox: modalBoxReducer,
});

export default reducer;  