
export interface UserData {
  id: number;
  name: string;
  role: "tl" | "so" | "pm";
  username: string;
  password: string;
  userkey: number;
  isActive: boolean;
  isWorkEvent: boolean;
}

export interface periodOfTime {
    id: number;
    startTime: string | null;
    endTime:  string | null;
  }

export interface BoxTaskTypes {
  operator: number | null;
  inProgress: boolean;
  isFinished: boolean;
  isPaused: boolean;
  periodsOfTime: periodOfTime[] | [];
  totalDurationMin: number;
}

export interface BoxData {
  id: number,
  barcode: string,
  folderRange: string | null,
  missingFolders: string [],
  notes: string | null,
  numberOfFolders: number | null,
  numberOfPages: number | null,
  inspection: BoxTaskTypes | null,
  preparation: BoxTaskTypes | null,
  scanning1: BoxTaskTypes | null,
  scanning2: BoxTaskTypes | null,
  review: BoxTaskTypes | null,
  ready: boolean,
  converted: boolean,
  uploaded: boolean
}

  export interface UserState {
    currentUser: UserData | null;
    userType: UserData["role"] | null,
    error: string | null;
    isFetching: boolean;
    isActive: boolean;
  }

  export interface LoginCredentials {
    username: string;
    password: string;
  }

  export interface MenuItemProps{
    title: string;
    path: string;
  }

  export interface TaskData {
    id: number;
    taskType: "Box Activity" | "Management Activity";
    activity: "Inspection" | "Preparation" | "Scanning 1" | "Scanning 2" | "Review" | "Team Meeting" | "Training" | "End of day Clean up" | "Administrative Management" | "Other";
    boxId: number | null;
    userId: number;
    startTime: string;
    endTime: string | null;
    isPaused: boolean;
  }

  export type ActivityType = TaskData['activity'];

  export interface EventLog {
    id: number;
    userId: number;
    eventType: "Work Start" | "Work End" | "Task Start" | "Task End" | "Task Pause";
    taskId: number | null;
    timestamp: string;
  }
  export interface UsersState {
    users: UserData[];
    error: string | null;
    isFetching: boolean;
  }

  export interface EventLogsState {
    eventLogs: EventLog[]
  }
  export interface BoxesState {
    boxes: BoxData[]
    barcodes: string []
  }
  export interface TasksState {
    tasks: TaskData[]
  }
export interface WorkEventsProps {
  userId: number;
  isActiveUser: boolean;
}

export interface RootState {
  user: UserState;
  users: UsersState;
  eventLogs: EventLogsState;
  boxes: BoxesState;
  tasks: TasksState;
}

export interface ProcessStatus {
  available: boolean;
  status: string;
  isFinished: boolean;
}

export interface ProcessStatuses {
  inspection: ProcessStatus;
  preparation: ProcessStatus;
  scanning1: ProcessStatus;
  scanning2: ProcessStatus;
  review: ProcessStatus;
}
export interface CustomInputProps {
  label: string;
  placeholder: string;
  required?: boolean;
  type: string;
  isMask?: boolean;
  getValue?: (value: string) => void;
  valueProps?: string;
  dark?: boolean;
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  withDel?: boolean;
}
