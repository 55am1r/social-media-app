import { createSlice } from "@reduxjs/toolkit";
import { getUserInfo } from "./serverSlice";
const initialState = {
  isLoading: false,
  profile: {},
  landingPage: {
    error: "",
    success: "",
  },
};
const appConfigSlicer = createSlice({
  name: "appConfigSlice",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setLandingPageError: (state, action) => {
      state.landingPage.error = action.payload;
    },
    setLandingPageSuccess: (state, action) => {
      state.landingPage.success = action.payload;
    },
    setProfile: (state, action) => {
      state.profile = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUserInfo.fulfilled, (state, action) => {
      state.profile = action.payload;
    });
  },
});

export default appConfigSlicer.reducer;

export const {
  setLoading,
  setLandingPageError,
  setLandingPageSuccess,
  setProfile,
} = appConfigSlicer.actions;
