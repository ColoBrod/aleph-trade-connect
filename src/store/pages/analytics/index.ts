import { combineReducers } from "redux";
import trendsReducer from "./trends";

const analyticsReducer = combineReducers({
  trends: trendsReducer,
});

export default analyticsReducer;  