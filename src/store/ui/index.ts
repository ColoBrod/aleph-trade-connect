import { combineReducers } from "redux";
import profileReducer from "./profile";
import calendarReducer from './calendar';
import filtersAsideReducer from "./filters-aside";

const uiReducer = combineReducers({
  filtersAside: filtersAsideReducer,
  calendar: calendarReducer,
  profile: profileReducer,
});

export default uiReducer;  