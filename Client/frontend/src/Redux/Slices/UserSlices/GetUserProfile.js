import { createSlice } from "@reduxjs/toolkit";
import { getUserInfo } from "../serverSlice";

const initialState = {
  isLoading: false,
  userprofile: {},
  errorlog: "",
};

const getUserProfile = createSlice({
  name: "getUserProfile",
  initialState,
  reducers: {
    resetUserProfile: (state, action) => {
      state.userprofile = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserInfo.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getUserInfo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userprofile = action.payload.result;
      })
      .addCase(getUserInfo.rejected, (state, action) => {
        state.isLoading = false;
        state.errorlog = action.error.message;
      });
  },
});
export default getUserProfile.reducer;
export const { resetUserProfile } = getUserProfile.actions;
