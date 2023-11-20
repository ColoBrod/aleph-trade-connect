import { combineReducers } from "redux";
import profileReducer from "./profile";
import calendarReducer from './calendar';

const uiReducer = combineReducers({
  calendar: calendarReducer,
  profile: profileReducer,
});

export default uiReducer;  