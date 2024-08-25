import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { EventLog, EventLogsState } from "../data/types";

const initialState: EventLogsState = {
  eventLogs: [],
};

const eventLogsSlice = createSlice({
  name: "eventLogs",
  initialState,
  reducers: {
    addEventLog: (state, action: PayloadAction<Omit<EventLog, 'id'>>) => {
      const newEventLog = {
        ...action.payload,
        id: state.eventLogs.length + 1,
      };
      state.eventLogs.push(newEventLog);
    },
    setEventLogs: (state, action: PayloadAction<EventLog[]>) => {
      state.eventLogs = action.payload;
    },
  },
});

export const {
  addEventLog,
  setEventLogs,
} = eventLogsSlice.actions;

export default eventLogsSlice.reducer;
