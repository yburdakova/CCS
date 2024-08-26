import { AppDispatch } from '../redux/store';
import { startTask, endTask, pauseTask } from '../redux/tasksRedux';
import { addEventLog } from '../redux/eventsRedux';
import { TaskData } from '../data/types';

export const recordTask = (
  dispatch: AppDispatch,
  taskType: TaskData['taskType'],
  activity: TaskData['activity'],
  boxId: number,
  userId: number,
  startTime: string,
  endTime: string | null = null,
  isPaused: boolean = false
) => {
  const taskData: Omit<TaskData, 'id'> = {
    taskType,
    activity,
    boxId,
    userId,
    startTime,
    endTime,
    isPaused,
  };

  dispatch(startTask(taskData));
};

export const endTaskWithLog = (
  dispatch: AppDispatch,
  taskId: number,
  userId: number,
  endTime: string
) => {
  dispatch(endTask(taskId));
  dispatch(addEventLog({
    userId,
    eventType: 'Task End',
    taskId,
    timestamp: endTime,
  }));
};

export const pauseTaskWithLog = (
  dispatch: AppDispatch,
  taskId: number,
  userId: number,
  pauseTime: string
) => {
  dispatch(pauseTask(taskId));
  dispatch(addEventLog({
    userId,
    eventType: 'Task Pause',
    taskId,
    timestamp: pauseTime,
  }));
};

export const recordEventLog = (
  dispatch: AppDispatch,
  userId: number,
  eventType: 'Task Start' | 'Task End' | 'Task Pause' | 'Work Start' | 'Work End',
  taskId: number | null,
  timestamp: string
) => {
  dispatch(addEventLog({
    userId,
    eventType,
    taskId,
    timestamp,
  }));
};
