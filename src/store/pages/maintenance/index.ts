import { combineReducers } from "redux";
import workingHoursReducer from './working-hours';
import monitoringReducer from './monitoring';

const maintenanceReducer = combineReducers({
  workingHours: workingHoursReducer,
  monitoring: monitoringReducer,
});

export default maintenanceReducer;  