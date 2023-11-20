import { combineReducers } from "redux";
import beveragesReducer from './beverages';
// import cleaningsReducer from './cleanings';

const dataExportReducer = combineReducers({
  beverages: beveragesReducer,
  // cleanings: cleaningsReducer,
});

export default dataExportReducer;  