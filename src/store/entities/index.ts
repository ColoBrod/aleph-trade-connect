import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { Status } from "~/interfaces/common";
import { createCustomAsyncThunk } from "~/services/custom-async-thunk";
import { apiCallPending, apiCallRejected, apiCallFullfilled } from "~/store/utils";
import {
  ICoffeeMachine,
  ICoffeeMachineModel,
  IBusinessUnit,
  IRecipe,
  IError
} from "~/interfaces/entities";


const PAGE_URL = "/entities";

interface Entities {
  status: Status;
  error: string;
  data: {
    // dispensings: number;
    coffeeMachines: ICoffeeMachine[];
    coffeeMachineModels: ICoffeeMachineModel[];
    businessUnits: IBusinessUnit[];
    recipes: IRecipe[];
    errors: IError[];
  };
}

const initialState: Entities = {
  status: 'idle',
  error: "",
  data: {
    // dispensings: 0,
    coffeeMachines: [],
    coffeeMachineModels: [],
    businessUnits: [],
    recipes: [],
    errors: [],
  },
};

export const fetchEntities = createCustomAsyncThunk("get", PAGE_URL);

// export const fetchDispensings = createAsyncThunk('entities/dispensings', async () => {
//   const response = await axios.get(BASE_URL + '/dispensings');
//   return response.data;
// });

const slice = createSlice({
  name: 'entities',
  initialState,
  reducers: {
    // getDispensings: (state, action) => {
    // },
  }, 
  extraReducers(builder) {
    builder
      .addCase(fetchEntities.pending, apiCallPending)
      .addCase(fetchEntities.fulfilled, (state, action) => {
        state.data = action.payload;
      })
      .addCase(fetchEntities.rejected, apiCallRejected)
  }
});

// export const { getDispensings } = slice.actions;
export default slice.reducer;