import { createSlice } from "@reduxjs/toolkit";
import {
  getUserInfo,
  getOwnPosts,
  getUserFollowers,
  getUserFollowings,
  getLikedPosts,
} from "./serverSlice";

const initialState = {
  profile: {},
  userPosts: [],
  userFollowers: [],
  userFollowings: [],
  userLikedPosts: [],
  requireUserPage: {
    error: "",
    success: "",
  },
  isLoading: false,
};
const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    resetInitialStateUser: (state, action) => {
      state.profile = {};
      state.userPosts = [];
      state.userFollowers = [];
      state.userFollowings = [];
      state.userLikedPosts = [];
      state.requireUserPage.error = "";
      state.requireUserPage.success = "";
      state.isLoading = false;
    },
    setLoadingUser: (state, action) => {
      state.isLoading = action.payload;
    },
    setProfile: (state, action) => {
      state.profile = action.payload;
    },
    setUserPosts: (state, action) => {
      state.userPosts = action.payload;
    },
    setUserFollowers: (state, action) => {
      state.userFollowers = action.payload;
    },
    setUserFollowings: (state, action) => {
      state.userFollowings = action.payload;
    },
    setUserLikedPosts: (state, action) => {
      state.userLikedPosts = action.payload;
    },
    setRequirePageError: (state, action) => {
      state.requireUserPage.error = action.payload;
    },
    setRequirePageSuccess: (state, action) => {
      state.requireUserPage.success = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserInfo.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getUserInfo.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload.errordetails) {
          state.requireUserPage.error = action.payload.errordetails;
        } else {
          state.profile = action.payload.result;
        }
      })
      .addCase(getUserInfo.rejected, (state, action) => {
        state.isLoading = false;
        state.requireUserPage.error = action.payload;
        console.log(action.payload);
      });
    builder
      .addCase(getOwnPosts.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getOwnPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload.errordetails) {
          state.requireUserPage.error = action.payload.errordetails;
        } else {
          state.userPosts = action.payload.result;
        }
      })
      .addCase(getOwnPosts.rejected, (state, action) => {
        state.isLoading = false;
        state.requireUserPage.error = action.payload;
        console.log(action.payload);
      });
    builder
      .addCase(getUserFollowers.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getUserFollowers.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload.statusCode === 200) {
          state.userFollowers = action.payload.result;
        } else {
          state.requireUserPage.error = action.payload.errordetails;
        }
      })
      .addCase(getUserFollowers.rejected, (state, action) => {
        state.isLoading = false;
        state.requireUserPage.error = action.payload;
        console.log(action.payload);
      });
    builder
      .addCase(getUserFollowings.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getUserFollowings.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload.statusCode === 200) {
          state.userFollowings = action.payload.result;
        } else {
          state.requireUserPage.error = action.payload.errordetails;
        }
      })
      .addCase(getUserFollowings.rejected, (state, action) => {
        state.isLoading = false;
        state.requireUserPage.error = action.payload;
        console.log(action.payload);
      });
    builder
      .addCase(getLikedPosts.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getLikedPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload.statusCode === 200) {
          state.userLikedPosts = action.payload.result;
        } else {
          state.requireUserPage.error = action.payload.errordetails;
        }
      })
      .addCase(getLikedPosts.rejected, (state, action) => {
        state.isLoading = false;
        state.requireUserPage.error = action.payload;
        console.log(action.payload);
      });
  },
});
export default userSlice.reducer;

export const {
  setProfile,
  setUserFollowers,
  setUserFollowings,
  setUserLikedPosts,
  setUserPosts,
  setRequirePageError,
  setRequirePageSuccess,
  resetInitialStateUser,
  setLoadingUser
} = userSlice.actions;
