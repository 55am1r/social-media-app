import { createSlice } from "@reduxjs/toolkit";
import {
  ACCESS_KEY,
  getAccessKey,
  setAccessKey,
} from "../../Utilities/LocalStorageManager";
import { loginApi, signUpApi } from "./serverSlice";

const initialState = {
  isLoading: false,
  landingPage: {
    error: "",
    success: "",
  },
  loginstatus: getAccessKey(ACCESS_KEY) ? true : false,
  signupstate: false,
};

const appConfigSlicer = createSlice({
  name: "appConfigSlice",
  initialState,
  reducers: {
    resetInitialStateAppConfig: (state, action) => {
      state.isLoading = false;
      state.landingPage.error = "";
      state.landingPage.success = "";
      state.loginstatus = false;
      state.signupstate = false;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setLandingPageError: (state, action) => {
      state.landingPage.error = action.payload;
    },
    setLandingPageSuccess: (state, action) => {
      state.landingPage.success = action.payload;
    },
    setLoginState: (state, action) => {
      state.loginstatus = action.payload;
    },
    setSignUpState: (state, action) => {
      state.signupstate = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signUpApi.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(signUpApi.fulfilled, (state, action) => {
      state.isLoading = false;
      if (action.payload.statusCode === 201) {
        state.signupstate = true;
        state.landingPage.success = action.payload.result;
      } else {
        state.landingPage.error = action.payload.errordetails;
      }
    });
    builder.addCase(signUpApi.rejected, (state, action) => {
      state.isLoading = false;
      state.landingPage.error = action.payload;
      console.log(action.payload);
    });
    builder.addCase(loginApi.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(loginApi.fulfilled, (state, action) => {
      state.isLoading = false;
      if (action.payload.errordetails) {
        state.landingPage.error = action.payload.errordetails;
      } else {
        state.loginstatus = true;
        setAccessKey(ACCESS_KEY, action.payload.result.JWT_ACCESS_KEY);
      }
    });
    builder.addCase(loginApi.rejected, (state, action) => {
      state.isLoading = false;
      state.landingPage.error = action.payload;
      console.log(action.payload);
    });
  },
});

export default appConfigSlicer.reducer;

export const {
  setLoading,
  setLandingPageError,
  setLandingPageSuccess,
  setLoginState,
  setSignUpState,
  resetInitialStateAppConfig,
} = appConfigSlicer.actions;
