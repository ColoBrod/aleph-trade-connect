import axios from 'axios';

import { AnyAction, Dispatch, Middleware, MiddlewareAPI, createAction } from "@reduxjs/toolkit";

export const fakeApiCallBegan = createAction("api/callBegan");
export const fakeApiCallSuccess = createAction("api/callSuccess");
export const fakeApiCallFailed = createAction("api/callFailed");

const fakeApi: Middleware<{}, any, Dispatch<AnyAction>> =
  (store: MiddlewareAPI) => 
  (next: Dispatch) => 
  async (action: AnyAction) => 
{
  if (action.type !== fakeApiCallBegan.type) return next(action);
  next(action);
  const { url, method, data, onSuccess, onError } = action.payload;

  const response = await new Promise<void>((resolve, reject) => {
    setTimeout(() => resolve(), 1000)
  });
  
  


  // try {
  //   const response = await axios.request({
  //     baseURL: "http://localhost:9001/api",
  //     url, // /bugs
  //     method,
  //     data,
  //   });
  //   // General
  //   store.dispatch(fakeApiCallSuccess(response.data));
  //   // Specific
  //   if (onSuccess)
  //     store.dispatch({ type: onSuccess, payload: response.data });
  // } 
  // catch (error: any) {
  //   // General action
  //   store.dispatch(fakeApiCallFailed(error));
  //   // Specific
  //   if (onError) store.dispatch({ type: onError, payload: error });
  // }
};

export default fakeApi;