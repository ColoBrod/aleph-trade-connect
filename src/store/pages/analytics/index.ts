import { combineReducers } from "redux";
import trendsReducer from "./trends";
import daylyReportsReducer from "./dayly-reports";

const analyticsReducer = combineReducers({
  daylyReports: daylyReportsReducer,
  trends: trendsReducer,
});

export default analyticsReducer;  