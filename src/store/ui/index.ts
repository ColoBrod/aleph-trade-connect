import { combineReducers } from "redux";
import profileReducer from "./profile";
import calendarReducer from './calendar';
import filtersAsideReducer from "./filters-aside";
import tooltipReducer from './tooltip';
import modalBoxReducer from './modal-box';

const uiReducer = combineReducers({
  filtersAside: filtersAsideReducer,
  calendar: calendarReducer,
  profile: profileReducer,
  tooltip: tooltipReducer,
  modalBox: modalBoxReducer,
});

export default uiReducer;  