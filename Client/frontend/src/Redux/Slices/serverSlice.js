import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosClient } from "../../Utilities/AxiosClient";

export const signUpApi = createAsyncThunk(
  "auth/sign-up",
  async (body, thunkAPI) => {
    const result = await AxiosClient.post("/auth/sign-up", body);
    return result;
  }
);
export const loginApi = createAsyncThunk(
  "loginCall",
  async (body, thunkAPI) => {
    const result = await AxiosClient.post("auth/log-in", body);
    return result;
  }
);
export const getUserInfo = createAsyncThunk(
  "getUserData",
  async (body, thunkAPI) => {
    const response = await AxiosClient.get("user/get-my-profile");
    return response;
  }
);
export const getOwnPosts = createAsyncThunk(
  "getUserPosts",
  async (body, thunkAPI) => {
    const response = await AxiosClient.get("posts/get-own-posts");
    return response;
  }
);
export const getUserFollowers = createAsyncThunk(
  "getFollowers",
  async (body, thunkAPI) => {
    const response = await AxiosClient.get("user/get-user-followers");
    return response;
  }
);
export const getUserFollowings = createAsyncThunk(
  "getFollowings",
  async (body, thunkAPI) => {
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
