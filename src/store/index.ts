import { configureStore } from "@reduxjs/toolkit";
import reducer from "./reducer";
import api from "./middleware/api";

// import api from "./middleware/api";

export default () => configureStore({ 
  reducer, 
  middleware: (middleware) => middleware()
    .concat(api),
});
