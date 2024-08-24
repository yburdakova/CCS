import { createSlice } from "@reduxjs/toolkit";
import { UserState } from "../data/types";

const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: null,
    userType: null,
  } as UserState,

  reducers: {

    loginFinish: (state) => {
      state.currentUser = null;
      state.userType = null;
    },
    loginSuccess: (state, action) => {
      state.currentUser = action.payload;
    },
    userAccess: (state, action) => {
      state.userType = action.payload;
    },
  }
});

export const {
  loginFinish,
  loginSuccess,
  userAccess,

} = userSlice.actions;

export default userSlice.reducer;


