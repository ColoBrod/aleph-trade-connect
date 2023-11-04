/**
 * TODO
 * 
 * Отказзываемся от этого файла в пользу createAsyncThunk
 */


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
  (action: AnyAction) => 
{
  
  if (action.type !== apiCallBegan.type) return next(action);
  
  const { url, method, data, onStart, onSuccess, onError } = action.payload;

  if (onStart) store.dispatch(onStart);

  next(action);

  axios.request({
    baseURL: "http://localhost:9000",
    url,
    method,
    data,
  })
    .then(response => {
      // General
      store.dispatch(apiCallSuccess(response.data));
      // Specific
      if (onSuccess)
        store.dispatch({ type: onSuccess, payload: response.data });
    })
    .catch(error => {
      // General action
      store.dispatch(apiCallFailed(error));
      // Specific
      if (onError) store.dispatch({ type: onError, payload: error });
    });
};

export default api;