import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TaskData } from "../data/types";

interface TasksState {
  tasks: TaskData[];
}

const initialState: TasksState = {
  tasks: [],
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    setTasks: (state, action: PayloadAction<TaskData[]>) => {
      state.tasks = action.payload;
    },
  },
});

export const { setTasks } = tasksSlice.actions;
export default tasksSlice.reducer;
