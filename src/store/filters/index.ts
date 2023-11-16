import { combineReducers } from "redux";
import analyticsReducer from "./analytics";

const reducer = combineReducers({
  analytics: analyticsReducer,
});

export default reducer;  