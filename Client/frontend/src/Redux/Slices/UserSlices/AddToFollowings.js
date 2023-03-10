import { createSlice } from "@reduxjs/toolkit";
import { addToFollowing } from "../serverSlice";

const initialState = {
  isLoading: false,
  returnMessage: "",
  errorLog: "",
  userIdToFollow: "",
};

const addToFollowings = createSlice({
  name: "addtoFriendsList",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(addToFollowing.pending, (state, action) => {
        state.userIdToFollow = action.meta.arg.followUserId;
        state.isLoading = true;
      })
      .addCase(addToFollowing.fulfilled, (state, action) => {
        state.isLoading = false;
        state.returnMessage = action.payload;
      })
      .addCase(addToFollowing.rejected, (state, action) => {
        state.isLoading = false;
        state.errorLog = action.error.message;
      });
  },
});

export default addToFollowings.reducer;
