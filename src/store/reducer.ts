import { combineReducers } from "redux";
import entitiesReducer from "./entities";
import uiReducer from "./ui";
import overviewReducer from "./pages/analytics/trends/overview";
import pagesReducer from "./pages";
import filtersReducer from "./filters";

// @ts-ignore
const reducer = combineReducers({
  filters: filtersReducer,
  pages: pagesReducer,
  overview: overviewReducer,
  ui: uiReducer,
  entities: entitiesReducer,
});

export default reducer;  