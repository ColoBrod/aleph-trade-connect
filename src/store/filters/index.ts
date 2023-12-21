import { combineReducers } from "redux";
import analyticsReducer from "./analytics";
import maintenanceReducer from "./maintenance";
import modalBoxReducer from "./modal-box";

const reducer = combineReducers({
  analytics: analyticsReducer,
  maintenance: maintenanceReducer,
  modalBox: modalBoxReducer,
});

export default reducer;  