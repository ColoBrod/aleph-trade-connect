import { combineReducers } from "redux";
import timeReducer from './time';
import eventsReducer from './events';

const dataExportReducer = combineReducers({
  time: timeReducer,
  events: eventsReducer,
});

export default dataExportReducer;