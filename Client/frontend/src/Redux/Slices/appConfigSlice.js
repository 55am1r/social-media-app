import { createSlice } from "@reduxjs/toolkit";
import {
  ACCESS_KEY,
  getAccessKey,
  setAccessKey,
} from "../../Utilities/LocalStorageManager";
import {
  getLikedPosts,
  getOwnPosts,
  getUserFollowers,
  getUserFollowings,
  getUserInfo,
  loginApi,
  signUpApi,
} from "./serverSlice";

const initialState = {
  isLoading: false,
  profile: {},
  landingPage: {
    error: "",
    success: "",
  },
  requireUserPage: {
    error: "",
    success: "",
  },
  userPosts: [],
  userFollowers: [],
  userFollowings: [],
  userLikedPosts: [],
  loginstatus: getAccessKey(ACCESS_KEY) ? true : false,
  signupstate: false,
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
    builder.addCase(getUserInfo.fulfilled, (state, action) => {
      state.profile = action.payload;
    });
    builder.addCase(getOwnPosts.fulfilled, (state, action) => {
      state.userPosts = action.payload;
    });
    builder.addCase(getUserFollowers.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getUserFollowers.fulfilled, (state, action) => {
      state.isLoading = false;
      if (action.payload.statusCode === 200) {
        state.userFollowers = action.payload.result;
      } else {
        state.requireUserPage.error = action.payload.errordetails;
      }
    });
    builder.addCase(getUserFollowings.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getUserFollowings.fulfilled, (state, action) => {
      state.isLoading = false;
      if (action.payload.statusCode === 200) {
        state.userFollowings = action.payload.result;
      } else {
        state.requireUserPage.error = action.payload.errordetails;
      }
    });
    builder.addCase(getLikedPosts.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getLikedPosts.fulfilled, (state, action) => {
      state.isLoading = false;
      if (action.payload.statusCode === 200) {
        state.userLikedPosts = action.payload.result;
      } else {
        state.requireUserPage.error = action.payload;
      }
    });
  },
});

export default appConfigSlicer.reducer;

export const {
  setLoading,
  setLandingPageError,
  setLandingPageSuccess,
  setProfile,
  setLoginState,
  setSignUpState,
} = appConfigSlicer.actions;
