import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosClient } from "../../Utilities/AxiosClient";
import { setLoading } from "./appConfigSlice";

export const signUpApi = createAsyncThunk("SignUp", async (body, thunkAPI) => {
  const result = await AxiosClient.post("/auth/sign-up", body);
  return result;
});
export const loginApi = createAsyncThunk(
  "loginCall",
  async (body, thunkAPI) => {
    thunkAPI.dispatch(setLoading(true));
    const result = await AxiosClient.post("auth/log-in", body);
    return result;
  }
);
export const getUserInfo = createAsyncThunk(
  "getUserData",
  async (body, thunkAPI) => {
    try {
      thunkAPI.dispatch(setLoading(true));
      const response = await AxiosClient.get("user/get-my-profile");
      return response.result;
    } catch (e) {
      console.log(e.message);
    } finally {
      thunkAPI.dispatch(setLoading(false));
    }
  }
);
export const getOwnPosts = createAsyncThunk(
  "getUserPosts",
  async (body, thunkAPI) => {
    try {
      const response = await AxiosClient.get("posts/get-own-posts");
      return response.result;
    } catch (e) {
      console.log(e.message);
    }
  }
);
export const getUserFollowers = createAsyncThunk(
  "getFollowers",
  async (body, thunkAPI) => {
    try {
      const response = await AxiosClient.get("user/get-user-followers");
      return response;
    } catch (e) {
      console.log(e.message);
    }
  }
);
export const getUserFollowings = createAsyncThunk(
  "getFollowings",
  async (body, thunk) => {
    const result = await AxiosClient.get("user/get-user-followings");
    return result;
  }
);
export const getLikedPosts = createAsyncThunk(
  "getLikedPosts",
  async (body, thunkAPI) => {
    const result = await AxiosClient.get("posts/get-liked-posts");
    return result;
  }
);
