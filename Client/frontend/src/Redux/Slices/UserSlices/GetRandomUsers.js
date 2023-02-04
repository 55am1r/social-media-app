import { createSlice } from "@reduxjs/toolkit";
import { getSuggestedUser } from "../serverSlice";

const initialState = {
  suggestedUser: [],
  isLoading: false,
  errorLog: "",
};

const getRandomUsers = createSlice({
  name: "getRandomUsers",
  initialState,
  reducers: {
    resetSuggestedUsers: (state, action) => {
      state.suggestedUser = [];
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    updateSuggestedUsers: (state, action) => {
      let indexofIdTR = -1;
      state.suggestedUser.forEach((item) => {
        if (item._id === action.payload) {
          indexofIdTR = state.suggestedUser.indexOf(item);
        }
      });
      state.suggestedUser.splice(indexofIdTR, 1);
    },
  },
  extraReducers: (builder) => [
    builder
      .addCase(getSuggestedUser.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getSuggestedUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.errorLog = "";
        state.suggestedUser = action.payload.result;
      })
      .addCase(getSuggestedUser.rejected, (state, action) => {
        state.isLoading = false;
        state.errorLog = action.error.message;
      }),
  ],
});

export default getRandomUsers.reducer;

export const { resetSuggestedUsers, setLoading, updateSuggestedUsers } =
  getRandomUsers.actions;
