import { createSlice } from "@reduxjs/toolkit";
import { postUserStatus } from "../serverSlice";

const initialState = {
  isLoading: false,
  errorLog: "",
  returnMessage: "",
};
const postUserStatusPost = createSlice({
  name: "postUserStatusPost",
  initialState,
  reducers: {
    setReturnMessage: (state, action) => {
      state.returnMessage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(postUserStatus.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(postUserStatus.fulfilled, (state, action) => {
        state.isLoading = false;
        state.returnMessage = action.payload.result;
      })
      .addCase(postUserStatus.rejected, (state, action) => {
        state.isLoading = false;
        state.errorLog = action.error.message;
      });
  },
});
export default postUserStatusPost.reducer;

export const { setReturnMessage } = postUserStatusPost.actions;
