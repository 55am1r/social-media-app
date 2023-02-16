import { createSlice } from "@reduxjs/toolkit";
import { getCurrUserInfo } from "../serverSlice";

const initialState = {
  isLoading: false,
  profile: {},
  errorlog: "",
};

const getCurrUserProfile = createSlice({
  name: "getCurUserProfile",
  initialState,
  reducers: {
    resetCurrUserProfile: (state, action) => {
      state.profile = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCurrUserInfo.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getCurrUserInfo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.profile = action.payload.result;
      })
      .addCase(getCurrUserInfo.rejected, (state, action) => {
        state.isLoading = false;
        state.errorlog = action.error.message;
      });
  },
});
export default getCurrUserProfile.reducer;

export const { resetCurrUserProfile } = getCurrUserProfile.actions;
