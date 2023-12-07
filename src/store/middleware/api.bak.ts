import axios from 'axios';

import { AnyAction, Dispatch, Middleware, MiddlewareAPI, createAction } from "@reduxjs/toolkit";

interface Payload {
  url: string;
  method: string;
  onStart?: string;
  onSuccess?: string;
  onError?: string;
}

export const apiCallBegan = createAction<Payload>("api/callBegan");
export const apiCallSuccess = createAction("api/callSuccess");
export const apiCallFailed = createAction("api/callFailed");

const api: Middleware<{}, any, Dispatch<AnyAction>> =
  (store: MiddlewareAPI) => 
  (next: Dispatch) => 
  async (action: AnyAction) => 
{
  if (action.type !== apiCallBegan.type) return next(action);
  next(action);

  const { url, method, data, onStart, onSuccess, onError } = action.payload;
  if (onStart) store.dispatch(onStart)
  try {
    const response = await axios.request({
      baseURL: "http://localhost:9000",
      url, // /bugs
      method,
      data,
    });
    // General
    store.dispatch(apiCallSuccess(response.data));
    // Specific
    if (onSuccess)
      store.dispatch({ type: onSuccess, payload: response.data });
  } 
  catch (error: any) {
    // General action
    store.dispatch(apiCallFailed(error));
    // Specific
    if (onError) store.dispatch({ type: onError, payload: error });
  }
};

export default api;


