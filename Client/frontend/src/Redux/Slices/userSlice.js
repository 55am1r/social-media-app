import { createSlice } from "@reduxjs/toolkit";
import {
  getOwnPosts,
  getUserFollowers,
  getUserFollowings,
  getLikedPosts,
} from "./serverSlice";

const initialState = {
  profile: {},
  currUserPosts: [],
  currUserFollowers: [],
  currUserFollowings: [],
  currUserLikedPosts: [],
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
      state.currUserPosts = [];
      state.currUserFollowers = [];
      state.currUserFollowings = [];
      state.currUserLikedPosts = [];
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
      state.currUserPosts = action.payload;
    },
    setUserFollowers: (state, action) => {
      state.currUserFollowers = action.payload;
    },
    setUserFollowings: (state, action) => {
      state.currUserFollowings = action.payload;
    },
    setUserLikedPosts: (state, action) => {
      state.currUserLikedPosts = action.payload;
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
      .addCase(getOwnPosts.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getOwnPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload.errordetails) {
          state.requireUserPage.error = action.payload.errordetails;
        } else {
          state.currUserPosts = action.payload.result;
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
        if (action.payload.errordetails) {
          state.requireUserPage.error = action.payload.errordetails;
        } else {
          state.currUserFollowers = action.payload.result;
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
        if (action.payload.errordetails) {
          state.requireUserPage.error = action.payload.errordetails;
        } else {
          state.currUserFollowings = action.payload.result;
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
        if (action.payload.errordetails) {
          state.requireUserPage.error = action.payload.errordetails;
        } else {
          state.currUserLikedPosts = action.payload.result;
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
  setLoadingUser,
} = userSlice.actions;
