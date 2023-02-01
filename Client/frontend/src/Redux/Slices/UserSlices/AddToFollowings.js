import { createSlice } from "@reduxjs/toolkit";
import { addToFollowing } from "../serverSlice";

const initialState = {
  isLoading: false,
  returnMessage: "",
};

const addToFollowings = createSlice({
  name: "addtoFriendsList",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(addToFollowing.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(addToFollowing.fulfilled, (state, action) => {
        state.isLoading = false;
        state.returnMessage = action.payload;
      });
  },
});

export default addToFollowings.reducer;
