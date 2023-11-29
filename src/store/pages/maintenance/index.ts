import { combineReducers } from "redux";
import workingHoursReducer from './working-hours';

const maintenanceReducer = combineReducers({
  workingHours: workingHoursReducer,
});

export default maintenanceReducer;  