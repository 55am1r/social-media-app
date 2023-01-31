import { createSlice } from "@reduxjs/toolkit";
import { getUserInfo } from "../serverSlice";

const initialState = {
  isLoading: false,
  profile: {},
};

const getUserProfile = createSlice({
  name: "getUserProfile",
  initialState,
  reducers: {
    resetProfile: (state, action) => {
      state.profile = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserInfo.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getUserInfo.fulfilled, (state, action) => {
        state.isLoading = false;
        if (!action.payload.errordetails) {
          state.profile = action.payload.result;
        }
      })
  },
});
export default getUserProfile.reducer;

export const { resetProfile } = getUserProfile.actions;
