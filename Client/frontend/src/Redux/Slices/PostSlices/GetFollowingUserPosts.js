import { createSlice } from "@reduxjs/toolkit";
import { getUserFollowingUserPosts } from "../serverSlice";

const initialState = {
  isLoading: false,
  userPosts: [],
  errorLog: "",
};
const getFollowingUserPosts = createSlice({
  name: "getUserPosts",
  initialState,
  reducers: {
    resetUserPosts: (state, action) => {
      state.userPosts = [];
    },
    likeAndDislikePost: (state, action) => {
      const postIndex = state.userPosts.findIndex(
        (item) => action.payload._id === item._id
      );
      if (postIndex !== undefined || postIndex !== -1) {
        state.userPosts[postIndex].likes = action.payload.likes;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserFollowingUserPosts.pending, (state, action) => {
        state.isLoading = true;
        state.errorLog = "";
      })
      .addCase(getUserFollowingUserPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        if (typeof action.payload.result === "string") {
          state.errorLog = action.payload.result;
        } else {
          state.errorLog = "";
          state.userPosts = action.payload.result;
        }
      })
      .addCase(getUserFollowingUserPosts.rejected, (state, action) => {
        state.isLoading = false;
        state.errorLog = action.error.message;
      });
  },
});
export default getFollowingUserPosts.reducer;

export const { resetUserPosts, likeAndDislikePost } =
  getFollowingUserPosts.actions;
