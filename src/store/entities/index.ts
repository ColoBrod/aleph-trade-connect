import { combineReducers } from "redux";

import dispensingsReducer from "./dispensings";

const entitiesReducer = combineReducers({
  dispensings: dispensingsReducer,
});

export default entitiesReducer;  