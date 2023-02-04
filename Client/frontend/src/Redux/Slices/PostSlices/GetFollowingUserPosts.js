import { createSlice } from "@reduxjs/toolkit";
import { getUserFollowingUserPosts } from "../serverSlice";

const initialState = {
  isLoading: false,
  userPosts: [],
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
      })
      .addCase(getUserFollowingUserPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userPosts = action.payload.result;
      });
  },
});
export default getFollowingUserPosts.reducer;

export const { resetUserPosts } = getFollowingUserPosts.actions;
