import { combineReducers } from "@reduxjs/toolkit";
import coffeeMachineReducer from './coffee-machine';

const modalBoxReducer = combineReducers({
  coffeeMachine: coffeeMachineReducer,
});

export default modalBoxReducer;