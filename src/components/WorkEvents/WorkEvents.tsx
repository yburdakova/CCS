import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../redux/store';
import { startTask, endTask } from '../../redux/tasksRedux';
import { addEventLog } from '../../redux/eventsRedux';
import { setIsWorkEvent } from '../../redux/userRedux'; // Исправлено
import { timeToString } from '../../middleware/formatDate';
import { ActivityType, WorkEventsProps } from '../../data/types';
import { useEffect } from 'react';
import styles from './WorkEvents.module.css';

const WorkEvents = ({ userId }: WorkEventsProps) => {
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const dispatch = useDispatch<AppDispatch>();
  const isUserAtWork = useSelector((state: RootState) => state.user.atWork);
  // const currentBoxId = useSelector((state: RootState) => state.user.currentBox);
  // const currentBoxProcess = useSelector((state: RootState) => state.user.currentBoxProcess);

  const activeManagementTask = tasks.find(
    (task) => task.userId === userId && task.taskType === "Management Activity" && task.endTime === null
  );
  const activeActivity = activeManagementTask?.activity;

  useEffect(() => {
    dispatch(setIsWorkEvent(!!activeManagementTask));
  }, [tasks, userId, dispatch, activeManagementTask]);

  const handleManagementTask = (activity: ActivityType) => {
    const timestamp = timeToString(new Date());

    const activeTask = tasks.find(task => task.userId === userId && task.endTime === null);
    if (activeTask) {
      dispatch(endTask(activeTask.id));
      dispatch(addEventLog({
        userId: userId,
        eventType: "Task End",
        taskId: activeTask.id,
        timestamp: timestamp,
      }));
    }

    if (activeManagementTask) {
      dispatch(endTask(activeManagementTask.id));
      dispatch(addEventLog({
        userId: userId,
        eventType: "Task End",
        taskId: activeManagementTask.id,
        timestamp: timestamp,
      }));
      dispatch(setIsWorkEvent(false));
    } else {

      const newTaskId = tasks.length + 1;

      dispatch(startTask({
        taskType: "Management Activity",
        activity,
        boxId: null,
        userId: userId,
        startTime: timestamp,
        endTime: null,
        isPaused: false,
      }));
      dispatch(addEventLog({
        userId: userId,
        eventType: "Task Start",
        taskId: newTaskId,
        timestamp: timestamp,
      }));
      dispatch(setIsWorkEvent(true));
    }
  };

  return (
    <div className="contentBlock">
      <fieldset>
        <legend>Work Events</legend>
        <button
          className={styles.workEventBtn}
          onClick={() => handleManagementTask("Team Meeting")}
          disabled={!isUserAtWork || (!!activeActivity && activeActivity !== "Team Meeting")}
        >
          {activeActivity === "Team Meeting" ? "End Team Meeting" : "Start Team Meeting"}
        </button>
        <button
          className={styles.workEventBtn}
          onClick={() => handleManagementTask("Training")}
          disabled={!isUserAtWork || (!!activeActivity && activeActivity !== "Training")}
        >
          {activeActivity === "Training" ? "End Training" : "Start Training"}
        </button>
        <button
          className={styles.workEventBtn}
          onClick={() => handleManagementTask("End of day Clean up")}
          disabled={!isUserAtWork || (!!activeActivity && activeActivity !== "End of day Clean up")}
        >
          {activeActivity === "End of day Clean up" ? "End Clean Up" : "Start Clean Up"}
        </button>
        <button
          className={styles.workEventBtn}
          onClick={() => handleManagementTask("Administrative Management")}
          disabled={!isUserAtWork || (!!activeActivity && activeActivity !== "Administrative Management")}
        >
          {activeActivity === "Administrative Management" ? "End Administrative Management" : "Start Administrative Management"}
        </button>
        <button
          className={styles.workEventBtn}
          disabled={!isUserAtWork || !!activeActivity}
        >
          Add event
        </button>
      </fieldset>
    </div>
  );
};

export default WorkEvents;
