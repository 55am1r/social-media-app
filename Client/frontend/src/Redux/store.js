import { configureStore } from "@reduxjs/toolkit";
import appConfigReducer from "./Slices/appConfigSlice";
import userReducer from "./Slices/userSlice";
import profileReducer from "./Slices/UserSlices/GetCurrUserProfile";
import userProfileReducer from "./Slices/UserSlices/GetUserProfile";
import suggestedUsersReducer from "./Slices/UserSlices/GetRandomUsers";
import addToFriendReducer from "./Slices/UserSlices/AddToFollowings";
import userPostsReduer from "./Slices/PostSlices/GetFollowingUserPosts";
import postUserStatusReducer from "./Slices/PostSlices/PostUserStatus";
import postLikeControlReducer from "./Slices/PostSlices/PostLikeControl";
import searchUserReducer from "./Slices/UserSlices/SearchUser";
export default configureStore({
  reducer: {
    appConfigReducer,
    user: userReducer,
    profileReducer,
    suggestedUsersReducer,
    addToFriendReducer,
    userPostsReduer,
    postUserStatusReducer,
    postLikeControlReducer,
    searchUserReducer,
    userProfileReducer
  },
});
