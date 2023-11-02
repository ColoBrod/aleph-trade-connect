import { combineReducers } from "redux";
import entitiesReducer from "./entities";
import uiReducer from "./ui";

const reducer = combineReducers({
  ui: uiReducer,
  entities: entitiesReducer,
});

export default reducer;  