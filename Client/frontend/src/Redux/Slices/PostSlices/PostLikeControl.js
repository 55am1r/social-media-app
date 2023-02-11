import { createSlice } from "@reduxjs/toolkit";
import { postControlLike } from "../serverSlice";

const initialState = {
  likedPosts: [],
  errorLog: "",
};
const postLikeControl = createSlice({
  name: "postLikeControl",
  initialState,
  reducers: {
    setLikedTrue: (state, action) => {
      state.likedPosts = action.payload;
    },
    resetPostLikeControl: (state, action) => {
      state.errorLog = "";
      state.likedPosts = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(postControlLike.fulfilled, (state, action) => {
        if (action.payload.postmessage === "Disliked") {
          const postIdIndex = state.likedPosts.indexOf(action.payload.post._id);
          state.likedPosts.splice(postIdIndex, 1);
        } else {
          state.likedPosts.push(action.payload.post._id);
        }
      })
      .addCase(postControlLike.rejected, (state, action) => {
        state.errorLog = action.error.message;
      });
  },
});
export default postLikeControl.reducer;

export const { setLikedTrue, resetPostLikeControl } = postLikeControl.actions;
