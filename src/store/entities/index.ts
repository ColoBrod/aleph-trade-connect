import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { Status } from "~/interfaces/common";
import { createCustomAsyncThunk } from "~/services/custom-async-thunk";
import { apiCallPending, apiCallRejected } from "~/store/utils";
import {
  ICoffeeMachine,
  ICoffeeMachineModel,
  IBusinessUnit,
  IRecipe,
  IError,
  ICoffeeMachineVendor
} from "~/interfaces/entities";

const PAGE_URL = "/entities";

export interface Entities {
  status: Status;
  error: string;
  data: {
    coffeeMachines: ICoffeeMachine[];
    coffeeMachineModels: ICoffeeMachineModel[];
    coffeeMachineVendors: ICoffeeMachineVendor[];
    businessUnits: IBusinessUnit[];
    recipes: IRecipe[];
    errors: IError[];
  };
}

export const initialState: Entities = {
  status: 'idle',
  error: "",
  data: {
    coffeeMachines: [],
    coffeeMachineModels: [],
    coffeeMachineVendors: [],
    businessUnits: [],
    recipes: [],
    errors: [],
  },
};

export const fetchEntities = createCustomAsyncThunk("get", PAGE_URL);

const slice = createSlice({
  name: 'entities',
  initialState,
  reducers: {
  }, 
  extraReducers(builder) {
    builder
      .addCase(fetchEntities.pending, apiCallPending)
      .addCase(fetchEntities.fulfilled, (state, action) => {
        state.data = action.payload;
        console.log("ENTITIES: ", action.payload);
      })
      .addCase(fetchEntities.rejected, apiCallRejected)
  }
});

export default slice.reducer;