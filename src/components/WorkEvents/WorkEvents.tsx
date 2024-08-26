import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../redux/store';
import { startTask, endTask } from '../../redux/tasksRedux';
import { addEventLog } from '../../redux/eventsRedux';
import { toggleUserWorkEvent } from '../../redux/usersRedux';
import { timeToString } from '../../middleware/formatDate';
import { ActivityType, WorkEventsProps } from '../../data/types';
import { useEffect, useState } from 'react';

const WorkEvents = ({ userId, isActiveUser }: WorkEventsProps) => {
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const dispatch = useDispatch<AppDispatch>();
  const [activeActivity, setActiveActivity] = useState<ActivityType | null>(null);

  useEffect(() => {
    const activeTask = tasks.find(task => task.userId === userId && task.endTime === null);
    if (activeTask) {
      setActiveActivity(activeTask.activity);
      dispatch(toggleUserWorkEvent({ userId, isWorkEvent: true }));
    } else {
      setActiveActivity(null);
      dispatch(toggleUserWorkEvent({ userId, isWorkEvent: false }));
    }
  }, [tasks, userId, dispatch]);

  const handleManagementTask = (activity: ActivityType) => {
    const timestamp = timeToString(new Date());
    const activeManagementTask = tasks.find(task => task.userId === userId && task.taskType === "Management Activity" && task.endTime === null);

    if (activeManagementTask) {
      dispatch(endTask(activeManagementTask.id));
      dispatch(addEventLog({
        userId: userId,
        eventType: "Task End",
        taskId: activeManagementTask.id,
        timestamp: timestamp,
      }));
      dispatch(toggleUserWorkEvent({ userId, isWorkEvent: false }));
      setActiveActivity(null);
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
      dispatch(toggleUserWorkEvent({ userId, isWorkEvent: true }));
      setActiveActivity(activity);
    }
  };

  return (
    <div className="contentBlock">
      <fieldset>
        <legend>Work Events</legend>
        <button
          onClick={() => handleManagementTask("Team Meeting")}
          disabled={!isActiveUser || (!!activeActivity && activeActivity !== "Team Meeting")}
        >
          {activeActivity === "Team Meeting" ? "End Team Meeting" : "Start Team Meeting"}
        </button>
        <button
          onClick={() => handleManagementTask("Training")}
          disabled={!isActiveUser || (!!activeActivity && activeActivity !== "Training")}
        >
          {activeActivity === "Training" ? "End Training" : "Start Training"}
        </button>
        <button
          onClick={() => handleManagementTask("End of day Clean up")}
          disabled={!isActiveUser || (!!activeActivity && activeActivity !== "End of day Clean up")}
        >
          {activeActivity === "End of day Clean up" ? "End Clean Up" : "Start Clean Up"}
        </button>
        <button
          onClick={() => handleManagementTask("Administrative Management")}
          disabled={!isActiveUser || (!!activeActivity && activeActivity !== "Administrative Management")}
        >
          {activeActivity === "Administrative Management" ? "End Administrative Management" : "Start Administrative Management"}
        </button>
        <button disabled={!isActiveUser || !!activeActivity}>Add event</button>
      </fieldset>
    </div>
  );
};

export default WorkEvents;
