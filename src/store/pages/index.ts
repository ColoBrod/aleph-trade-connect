import { combineReducers } from "redux";
import analyticsReducer from "./analytics";

const pagesReducer = combineReducers({
  analytics: analyticsReducer,
});

export default pagesReducer;  