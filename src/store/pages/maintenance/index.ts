import { combineReducers } from "redux";
import workingHoursReducer from './working-hours';
import monitoringReducer from './monitoring';
import dataExportReducer from './data-export';

const maintenanceReducer = combineReducers({
  workingHours: workingHoursReducer,
  monitoring: monitoringReducer,
  dataExport: dataExportReducer,
});

export default maintenanceReducer;  