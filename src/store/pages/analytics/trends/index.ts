import { combineReducers } from "redux";
import overviewReucer from './overview';

const trendsReducer = combineReducers({
  overview: overviewReucer,
});

export default trendsReducer;  