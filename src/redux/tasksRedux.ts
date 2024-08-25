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
    startTask: (state, action: PayloadAction<Omit<TaskData, 'id'>>) => {
      const newTask = {
        ...action.payload,
        id: state.tasks.length + 1,
      };
      state.tasks.push(newTask);
    },
    endTask: (state, action: PayloadAction<number>) => {
      const task = state.tasks.find(t => t.id === action.payload);
      if (task) {
        task.endTime = new Date().toISOString();
      }
    },
    setTasks: (state, action: PayloadAction<TaskData[]>) => {
      state.tasks = action.payload;
    },
  },
});

export const { setTasks, startTask, endTask } = tasksSlice.actions;
export default tasksSlice.reducer;
