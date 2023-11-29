import { combineReducers } from "redux";
import analyticsReducer from "./analytics";
import maintenanceReducer from "./maintenance";

const reducer = combineReducers({
  analytics: analyticsReducer,
  maintenance: maintenanceReducer,
});

export default reducer;  