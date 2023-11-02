import { combineReducers } from "redux";
import profileReducer from "./profile";

const uiReducer = combineReducers({
  profile: profileReducer,
});

export default uiReducer;  