import { combineReducers } from "redux";
import analyticsReducer from "./analytics";
import authReducer from './auth';

const pagesReducer = combineReducers({
  analytics: analyticsReducer,
  auth: authReducer,
});

export default pagesReducer;  