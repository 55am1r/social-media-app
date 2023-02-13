import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosClient } from "../../Utilities/AxiosClient";
import { likeAndDislikePost } from "./PostSlices/GetFollowingUserPosts";
import { setLikedTrue } from "./PostSlices/PostLikeControl";
import { setRequirePageError, setRequirePageSuccess } from "./userSlice";
import { updateSuggestedUsers } from "./UserSlices/GetRandomUsers";

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
      thunkAPI.dispatch(setLikedTrue(response.result.likedposts));
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
    try {
      const result = await AxiosClient.get("posts/get-following-user-posts");
      if (result.statusCode !== 200) {
        thunkAPI.dispatch(setRequirePageError(result.errordetails));
        return Promise.reject(result.errordetails);
      }
      return result;
    } catch (e) {
      thunkAPI.dispatch(setRequirePageError(e.message));
      console.log(e);
      return Promise.reject(e.message);
    }
  }
);
export const getSuggestedUser = createAsyncThunk(
  "getSuggestedUserList",
  async (body, thunkAPI) => {
    try {
      const result = await AxiosClient.get("user/get-suggested-users");
      if (result.statusCode !== 200) {
        thunkAPI.dispatch(setRequirePageError(result.errordetails));
        return Promise.reject(result.errordetails);
      }
      thunkAPI.dispatch(setRequirePageSuccess("Got New Suggestions 😃"));
      return result;
    } catch (e) {
      thunkAPI.dispatch(setRequirePageError(e.message));
      console.log(e);
      return Promise.reject(e.message);
    }
  }
);
export const addToFollowing = createAsyncThunk(
  "addFriend",
  async (body, thunkAPI) => {
    try {
      const result = await AxiosClient.post("user/follow-user", body);
      if (result.statusCode !== 200) {
        thunkAPI.dispatch(setRequirePageError(result.errordetails));
        return Promise.reject(result.errordetails);
      }
      thunkAPI.dispatch(updateSuggestedUsers(body.followUserId));
      thunkAPI.dispatch(setRequirePageSuccess(result.result));
      thunkAPI.dispatch(getUserFollowingUserPosts());
      return result;
    } catch (e) {
      thunkAPI.dispatch(setRequirePageError(e.message));
      console.log(e);
      return Promise.reject(e.message);
    }
  }
);
export const postUserStatus = createAsyncThunk(
  "postUserStatus",
  async (body, thunkAPI) => {
    try {
      const result = await AxiosClient.post("posts/post-feed", body);
      if (result.statusCode !== 201) {
        thunkAPI.dispatch(setRequirePageError(result.errordetails));
        return Promise.reject(result.errordetails);
      }
      thunkAPI.dispatch(setRequirePageSuccess(result.result));
      return result;
    } catch (e) {
      thunkAPI.dispatch(setRequirePageError(e.message));
      console.log(e);
      return Promise.reject(e.message);
    }
  }
);
export const postControlLike = createAsyncThunk(
  "postControlLike",
  async (body, thunkAPI) => {
    try {
      const result = await AxiosClient.post("posts/like-feed", body);
      if (result.statusCode !== 200) {
        thunkAPI.dispatch(setRequirePageError(result.errordetails));
        return Promise.reject(result.errordetails);
      }
      thunkAPI.dispatch(likeAndDislikePost(result.result.post));
      return result.result;
    } catch (e) {
      thunkAPI.dispatch(setRequirePageError(e.message));
      console.log(e);
      return Promise.reject(e.message);
    }
  }
);
