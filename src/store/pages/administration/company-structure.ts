import { createSlice } from "@reduxjs/toolkit";
import { IUser } from "~/interfaces/entities";
import { createCustomAsyncThunk } from "~/services/custom-async-thunk";
import { State as StateBase, apiCallPending, apiCallRejected } from "~/store/utils";
import { Status } from "~/interfaces/common";

type ModalBoxPage = 'add-user' | 'all-users';

interface State extends StateBase {
  modalBox: {
    users: IUser[];
    isVisible: boolean;
    page: ModalBoxPage;
  };
  businessUnitId: string;
  userId: string;
  users: IUser[];
}

const initialState: State = {
  status: 'idle',
  error: "",
  modalBox: {
    users: [],
    isVisible: false,
    page: 'all-users',
  },
  businessUnitId: "",
  userId: "",
  users: [],
}

export const fetchUsers = 
  createCustomAsyncThunk("post", "/administration/company-structure");

const slice = createSlice({
  name: 'company-structure',
  initialState,
  reducers: {
    modalBoxUsersSet: (state, action: { type: string; payload: IUser[]; }) => {
      state.modalBox.users = action.payload;
    },
    modalBoxToggled: (state, action: { type: string; payload: boolean | undefined }) => {
      const isVisible = action.payload;
      if (isVisible) state.modalBox.isVisible = isVisible;
      else state.modalBox.isVisible = !state.modalBox.isVisible;
    },
    modalBoxPageSet: (state, action: { type: string; payload: ModalBoxPage }) => {
      const page = action.payload;
      state.modalBox.page = page;
    },
    businessUnitSet: (state, action) => {
      state.businessUnitId = action.payload;
    },
    userSet: (state, action) => {
      state.userId = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchUsers.pending, apiCallPending)
      .addCase(fetchUsers.rejected, apiCallRejected)
      .addCase(fetchUsers.fulfilled, (state, action: { type: string; payload: { users: IUser[] } }) => {
        state.status = 'success';
        state.users = action.payload.users;
      })
      // .addCase(fetchUsers.fulfilled, (state, action) => {
      //   // state.users = action.payload.users;
      // })
      // .addCase(fetchUsers.rejected, apiCallRejected)

  },
});

export const { modalBoxUsersSet, modalBoxToggled, modalBoxPageSet, businessUnitSet, userSet } = slice.actions;
export default slice.reducer;
