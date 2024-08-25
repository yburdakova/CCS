import { EventLog } from "./types";

export const eventLogs: EventLog[] = [
  { id: 1, userId: 1, eventType: "Work Start", taskId: null, timestamp: "2024-08-19T08:00:00" },
  { id: 2, userId: 2, eventType: "Work Start", taskId: null, timestamp: "2024-08-19T08:00:00" },
  { id: 3, userId: 3, eventType: "Work Start", taskId: null, timestamp: "2024-08-19T08:00:00" },
  { id: 4, userId: 4, eventType: "Work Start", taskId: null, timestamp: "2024-08-19T08:00:00" },
  { id: 5, userId: 6, eventType: "Work Start", taskId: null, timestamp: "2024-08-19T08:00:00" },

  { id: 6, userId: 1, eventType: "Task Start", taskId: 1, timestamp: "2024-08-19T08:00:00" },
  { id: 7, userId: 1, eventType: "Task End", taskId: 1, timestamp: "2024-08-19T08:10:00" },

  { id: 8, userId: 1, eventType: "Task Start", taskId: 2, timestamp: "2024-08-19T09:10:00" },
  { id: 9, userId: 1, eventType: "Task End", taskId: 2, timestamp: "2024-08-19T10:30:00" },

  { id: 10, userId: 1, eventType: "Task Start", taskId: 3, timestamp: "2024-08-19T10:40:00" },
  { id: 11, userId: 1, eventType: "Task End", taskId: 3, timestamp: "2024-08-19T11:50:00" },

  { id: 12, userId: 4, eventType: "Task Start", taskId: 4, timestamp: "2024-08-19T12:00:00" },
  { id: 13, userId: 4, eventType: "Task End", taskId: 4, timestamp: "2024-08-19T13:30:00" },

  { id: 14, userId: 3, eventType: "Task Start", taskId: 5, timestamp: "2024-08-19T13:45:00" },
  { id: 15, userId: 3, eventType: "Task End", taskId: 5, timestamp: "2024-08-19T14:30:00" },

  { id: 16, userId: 2, eventType: "Task Start", taskId: 6, timestamp: "2024-08-19T08:30:00" },
  { id: 17, userId: 2, eventType: "Task End", taskId: 6, timestamp:  "2024-08-19T09:15:00 " },

  { id: 18, userId: 2, eventType: "Task Start", taskId: 7, timestamp:  "2024-08-19T09:30:00 " },
  { id: 19, userId: 2, eventType: "Task End", taskId: 7, timestamp:  "2024-08-19T10:30:00 " },

  { id: 20, userId: 2, eventType: "Task Start", taskId: 8, timestamp:  "2024-08-19T10:45:00 " },
  { id: 21, userId: 2, eventType: "Task End", taskId: 8, timestamp:  "2024-08-19T11:30:00 " },

  { id: 22, userId: 6, eventType: "Task Start", taskId: 9, timestamp:  "2024-08-19T12:00:00 " },
  { id: 23, userId: 6, eventType: "Task End", taskId: 9, timestamp:  "2024-08-19T13:00:00 " },

  { id: 24, userId: 1, eventType: "Task Start", taskId: 10, timestamp:  "2024-08-19T13:15:00 " },
  { id: 25, userId: 1, eventType: "Task End", taskId: 10, timestamp:  "2024-08-19T14:00:00 " },

  { id: 26, userId: 1, eventType: "Task Start", taskId: 11, timestamp:  "2024-08-19T14:15:00 " },
  { id: 27, userId: 1, eventType: "Task End", taskId: 11, timestamp:  "2024-08-19T15:00:00 " },

  { id: 28, userId: 3, eventType: "Task Start", taskId: 12, timestamp:  "2024-08-19T14:00:00 " },
  { id: 29, userId: 3, eventType: "Task End", taskId: 12, timestamp:  "2024-08-19T15:00:00 " },

  { id: 30, userId: 4, eventType: "Task Start", taskId: 13, timestamp:  "2024-08-19T14:00:00 " },
  { id: 31, userId: 4, eventType: "Task End", taskId: 13, timestamp:  "2024-08-19T14:45:00 " },

  { id: 32, userId: 1, eventType: "Task Start", taskId: 14, timestamp:  "2024-08-19T15:15:00 " },
  { id: 33, userId: 1, eventType: "Task End", taskId: 14, timestamp:  "2024-08-19T16:00:00 " },

  { id: 34, userId: 1, eventType: "Task Start", taskId: 15, timestamp:  "2024-08-19T16:15:00 " },
  { id: 35, userId: 1, eventType: "Task End", taskId: 15, timestamp:  "2024-08-19T17:00:00 " },

  { id: 36, userId: 1, eventType: "Task Start", taskId: 16, timestamp:  "2024-08-19T17:15:00 " },
  { id: 37, userId: 1, eventType: "Task End", taskId: 16, timestamp:  "2024-08-19T18:30:00 " },

  { id: 38, userId: 6, eventType: "Task Start", taskId: 17, timestamp:  "2024-08-19T18:45:00 " },
  { id: 39, userId: 6, eventType: "Task End", taskId: 17, timestamp:  "2024-08-19T19:45:00 " },

  { id: 40, userId: 2, eventType: "Task Start", taskId: 18, timestamp:  "2024-08-19T20:00:00 " },
  { id: 41, userId: 2, eventType: "Task End", taskId: 18, timestamp:  "2024-08-19T20:45:00 " },

  { id: 42, userId: 1, eventType: "Task Start", taskId: 19, timestamp:  "2024-08-19T20:50:00 " },
  { id: 43, userId: 1, eventType: "Task End", taskId: 19, timestamp:  "2024-08-19T21:10:00 " },

  { id: 44, userId: 6, eventType: "Task Start", taskId: 20, timestamp:  "2024-08-19T19:50:00 " },
  { id: 45, userId: 6, eventType: "Task End", taskId: 20, timestamp:  "2024-08-19T20:10:00 " },

  { id: 46, userId: 1, eventType: "Work End", taskId: null, timestamp:  "2024-08-19T17:00:00 " },
  { id: 47, userId: 2, eventType: "Work End", taskId: null, timestamp:  "2024-08-19T17:00:00 " },
  { id: 48, userId: 3, eventType: "Work End", taskId: null, timestamp:  "2024-08-19T17:00:00 " },
  { id: 49, userId: 4, eventType: "Work End", taskId: null, timestamp:  "2024-08-19T17:00:00 " },
  { id: 50, userId: 6, eventType: "Work End", taskId: null, timestamp:  "2024-08-19T17:00:00 " },
];

