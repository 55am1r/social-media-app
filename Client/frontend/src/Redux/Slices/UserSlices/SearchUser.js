import { createSlice } from "@reduxjs/toolkit";
import { searchUser } from "../serverSlice";

const initialState = {
  isLoading: false,
  foundUsers: [],
  errorLog: "",
};
const searchUsers = createSlice({
  name: "searchUsers",
  initialState,
  reducers: {
    resetSearchUsers: (state, action) => {
      state.foundUsers = [];
      state.errorLog = "";
    },
    setFoundUsers: (state, action) => {
      state.foundUsers = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchUser.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(searchUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.errorLog = "";
        state.foundUsers = action.payload;
      })
      .addCase(searchUser.rejected, (state, action) => {
        state.isLoading = false;
        state.foundUsers = [];
        state.errorLog = action.error.message;
      });
  },
});
export default searchUsers.reducer;

export const { resetSearchUsers, setFoundUsers } = searchUsers.actions;
