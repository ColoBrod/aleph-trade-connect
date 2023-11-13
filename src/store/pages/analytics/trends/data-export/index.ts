import { combineReducers } from "redux";
import beveragesReducer from './beverages';

const dataExportReducer = combineReducers({
  beverages: beveragesReducer,
});

export default dataExportReducer;  