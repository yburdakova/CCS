import { createSlice } from "@reduxjs/toolkit";
import { UserState } from "../data/types";

const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: null,
    userType: null,
    error: null,
    isFetching: false,
    currentBox: null,
    currentBoxProcess: null,
    isWorkEvent: false,
    atWork: false

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
    updateCurrentBox(state, action) {
      state.currentBox = action.payload;
    },
    updateCurrentBoxProcess(state, action) {
      state.currentBoxProcess = action.payload;
    },
    setIsWorkEvent(state, action) {
      state.isWorkEvent = action.payload;
    },
    setAtWork(state, action) {
      state.atWork = action.payload;
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
  setAtWork,
  setIsWorkEvent,
  updateCurrentBox,
  updateCurrentBoxProcess
} = userSlice.actions;

export default userSlice.reducer;
