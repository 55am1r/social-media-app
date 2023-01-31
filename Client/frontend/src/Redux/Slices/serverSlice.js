import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosClient } from "../../Utilities/AxiosClient";
import { setRequirePageError } from "./userSlice";

export const signUpApi = createAsyncThunk("auth/sign-up", async (body) => {
  const result = await AxiosClient.post("/auth/sign-up", body);
  return result;
});
export const loginApi = createAsyncThunk("loginCall", async (body) => {
  const result = await AxiosClient.post("auth/log-in", body);
  return result;
});
export const getUserInfo = createAsyncThunk(
  "getUserData",
  async (body, thunkAPI) => {
    try {
      const response = await AxiosClient.get("user/get-my-profile");
      if (response.statusCode !== 200) {
        thunkAPI.dispatch(setRequirePageError(response.errordetails));
        return {};
      }
      return response;
    } catch (e) {
      thunkAPI.dispatch(setRequirePageError(e.message));
      console.log(e);
    }
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
export const getUserFollowingUserPosts = createAsyncThunk(
  "getUserFollowingPosts",
  async (body, thunkAPI) => {
    const result = await AxiosClient.get("posts/get-following-user-posts");
    return result;
  }
);
export const getSuggestedUser = createAsyncThunk(
  "getSuggestedUserList",
  async (body, thunkAPI) => {
    const result = await AxiosClient.get("user/get-suggested-users");
    return result;
  }
);
export const addFriend = createAsyncThunk(
  "addFriend",
  async (body, thunkAPI) => {
    const result = await AxiosClient.post("user/follow-user", body);
    return result;
  }
);
