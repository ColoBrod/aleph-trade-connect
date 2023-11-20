import { combineReducers } from "redux";
import trendsReducer from "./trends";
import daylyReportsReducer from "./dayly-reports";
import dataExportReducer from "./data-export";

const analyticsReducer = combineReducers({
  daylyReports: daylyReportsReducer,
  trends: trendsReducer,
  dataExport: dataExportReducer,
});

export default analyticsReducer;  