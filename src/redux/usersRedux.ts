import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserData, UsersState } from "../data/types";

const initialState: UsersState = {
  users: [],
  error: null,
  isFetching: false,
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<UserData[]>) => {
      state.users = action.payload;
    },
    startWork: (state, action: PayloadAction<number>) => {
      const user = state.users.find(user => user.id === action.payload);
      if (user) {
        user.isActive = true;
      }
    },
    endWork: (state, action: PayloadAction<number>) => {
      const user = state.users.find(user => user.id === action.payload);
      if (user) {
        user.isActive = false;
      }
    },
    toggleUserWorkEvent: (state, action: PayloadAction<{ userId: number; isWorkEvent: boolean }>) => {
      const user = state.users.find(user => user.id === action.payload.userId);
      if (user) {
        user.isWorkEvent = action.payload.isWorkEvent;
      }
    },
    setFetching: (state, action: PayloadAction<boolean>) => {
      state.isFetching = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    }
  },
});

export const {
  setUsers,
  startWork,
  endWork,
  setFetching,
  setError,
  toggleUserWorkEvent
} = usersSlice.actions;

export default usersSlice.reducer;
