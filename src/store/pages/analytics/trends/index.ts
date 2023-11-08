import { combineReducers } from "redux";
import overviewReucer from './overview';
import salesReducer from './sales'

const trendsReducer = combineReducers({
  sales: salesReducer,
  overview: overviewReucer,
});

export default trendsReducer;  