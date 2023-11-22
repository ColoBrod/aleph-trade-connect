import { PayloadAction, SerializedError } from "@reduxjs/toolkit";
import { Status } from "~/interfaces/common";

interface State {
  status: Status;
  error: string;
}

export const apiCallPending = (
  state: State, 
  action: PayloadAction<undefined, string, {
    arg: void;
    requestId: string;
    requestStatus: "pending";
  }, never>
) => 
{
  state.status = 'loading';
}

export const apiCallRejected = (
  state: State, 
  action: PayloadAction<unknown, string, {
    arg: void;
    requestId: string;
    requestStatus: "rejected";
    aborted: boolean;
    condition: boolean;
  } & ({
      rejectedWithValue: true;
  } | ({
      rejectedWithValue: false;
  } & {})), SerializedError>
) => 
{
  state.status = 'error';
  const { message } = action.error;
  if (message) state.error = message;
}

export const apiCallFullfilled = <T extends State>(
  state: T,
  action: PayloadAction<any, string, {
    arg: void;
    requestId: string;
    requestStatus: "fulfilled";
  }, never>
) => {
  state.status = 'success';
  Object.assign(state, action.payload);
}