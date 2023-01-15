import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosClient } from "../../Utilities/AxiosClient";
import { setLoading } from "./appConfigSlice";
export const getUserInfo = createAsyncThunk(
  "getUserData",
  async (body, thunkAPI) => {
    try {
      thunkAPI.dispatch(setLoading(true));
      const result = await AxiosClient.get("user/get-my-profile");
      console.log(result);
    } catch (e) {
      console.log(e.message);
    } finally {
      thunkAPI.dispatch(setLoading(false));
    }
  }
);
export const loginApi = createAsyncThunk(
  "loginCall",
  async (body, thunkAPI) => {
    try {
      thunkAPI.dispatch(setLoading(true));
      const result = await AxiosClient.get("auth/log-in");
      console.log("from CAT: ", result);
    } catch (e) {
      console.log(e.message);
    } finally {
      thunkAPI.dispatch(setLoading(false));
    }
  }
);
