import { configureStore } from "@reduxjs/toolkit";
import appConfigReducer from "./Slices/appConfigSlice";
import userReducer from "./Slices/userSlice";
import profileReducer from "./Slices/UserSlices/GetUserInfo";
import suggestedUsersReducer from "./Slices/UserSlices/GetRandomUsers";
import addToFriendReducer from "./Slices/UserSlices/AddToFollowings";
export default configureStore({
  reducer: {
    appConfigReducer,
    user: userReducer,
    profileReducer,
    suggestedUsersReducer,
    addToFriendReducer,
  },
});
