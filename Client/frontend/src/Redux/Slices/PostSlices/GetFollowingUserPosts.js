import { createSlice } from "@reduxjs/toolkit";
import { getUserFollowingUserPosts } from "../serverSlice";

const initialState = {
  isLoading: false,
  userPosts: [],
  errorLog: [],
};
const getFollowingUserPosts = createSlice({
  name: "getUserPosts",
  initialState,
  reducers: {
    resetUserPosts: (state, action) => {
      state.userPosts = [];
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
        state.errorLog = [];
        state.userPosts = action.payload.result;
      })
      .addCase(getUserFollowingUserPosts.rejected, (state, action) => {
        state.isLoading = false;
        state.errorLog = action.error.message;
      });
  },
});
export default getFollowingUserPosts.reducer;

export const { resetUserPosts } = getFollowingUserPosts.actions;
