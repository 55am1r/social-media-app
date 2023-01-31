import { createSlice } from "@reduxjs/toolkit";
import { addFriend } from "./serverSlice";

const initialState = {
  currUserPosts: [],
  currUserLikedPosts: [],
  userPosts: [],
  isLoading: false,
};

const postSlice = createSlice({
  name: "postSlice",
  initialState,
  reducers: {
    resetPostsInitialState: (state, action) => {
      state.currUserLikedPosts = [];
      state.currUserPosts = [];
      state.userPosts = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addFriend.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(addFriend.fulfilled, (state, action) => {
        state.isLoading = false;
      });
  },
});

export default postSlice.reducer;

export const { resetPostsInitialState } = postSlice.actions;
