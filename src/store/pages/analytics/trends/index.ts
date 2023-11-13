import { combineReducers } from "redux";
import overviewReucer from './overview';
import salesReducer from './sales'
import dataExportReducer from "./data-export";

const trendsReducer = combineReducers({
  sales: salesReducer,
  overview: overviewReucer,
  dataExport: dataExportReducer,
});

export default trendsReducer;  