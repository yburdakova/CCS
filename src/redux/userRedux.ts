import { createSlice } from "@reduxjs/toolkit";
import { UserState } from "../data/types";

const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: null,
    userType: null,
    error: null,
    isFetching: false,
  } as UserState,

  reducers: {
    loginStart: (state) => {
      state.isFetching = true;
      state.error = null;
    },
    loginFinish: (state) => {
      state.currentUser = null;
      state.userType = null;
      state.error = null;
      state.isFetching = false;
    },
    loginSuccess: (state, action) => {
      state.isFetching = false;
      state.currentUser = action.payload;
      state.error = null;
    },
    adminAccess: (state, action) => {
      state.userType = action.payload;
    },
    loginFailure: (state, action) => {
      state.isFetching = false;
      state.error = action.payload === 401 ? "Invalid username or password" : "Something went wrong...";
    },
    resetError: (state) => {
      state.error = null;
    },
  }
});

export const {
  loginStart,
  loginFinish,
  loginSuccess,
  loginFailure,
  resetError,
  adminAccess,
} = userSlice.actions;

export default userSlice.reducer;
