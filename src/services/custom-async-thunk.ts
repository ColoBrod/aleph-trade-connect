import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import config from "~/config";

const API_URL = config.api.url;

export const createCustomAsyncThunk = (method: "get" | "post", path: string) => {
  return createAsyncThunk(path, async () => {
    const response = await axios[method](API_URL + path);
    return response.data;
  })
};