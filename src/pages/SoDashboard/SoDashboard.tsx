import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../redux/store';
import { startTask, endTask } from '../../redux/tasksRedux';
import { addEventLog } from '../../redux/eventsRedux';
import { timeToString } from '../../middleware/formatDate';
import styles from './SoDashboard.module.css';
import { ActivityType } from '../../data/types';
import { endWork, startWork } from '../../redux/usersRedux';
import { CustomInput } from '../../components';
import { useEffect, useState } from 'react';

const SoDashboard = () => {
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const user = useSelector((state: RootState) =>
    currentUser ? state.users.users.find(u => u.id === currentUser.id) : null
  );

  const [activeActivity, setActiveActivity] = useState<ActivityType | null>(null);

  const isActiveUser = user?.isActive ?? false;
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    // Определяем активную задачу при рендере страницы
    const activeTask = tasks.find(task => task.userId === user?.id && task.endTime === null);
    if (activeTask) {
      setActiveActivity(activeTask.activity);
    } else {
      setActiveActivity(null);
    }
  }, [tasks, user]);

  const handleWorkToggle = () => {
    const timestamp = timeToString(new Date());

    if (user) {
      if (isActiveUser) {
        dispatch(endWork(user.id));
        dispatch(addEventLog({
          userId: user.id,
          eventType: "Work End",
          taskId: null,
          timestamp: timestamp,
        }));
      } else {
        dispatch(startWork(user.id));
        dispatch(addEventLog({
          userId: user.id,
          eventType: "Work Start",
          taskId: null,
          timestamp: timestamp,
        }));
      }
    }
  };

  const handleManagementTask = (activity: ActivityType) => {
    const timestamp = timeToString(new Date());
    const activeManagementTask = tasks.find(task => task.userId === user?.id && task.taskType === "Management Activity" && task.endTime === null);

    if (activeManagementTask) {
      dispatch(endTask(activeManagementTask.id));
      dispatch(addEventLog({
        userId: user!.id,
        eventType: "Task End",
        taskId: activeManagementTask.id,
        timestamp: timestamp,
      }));
      setActiveActivity(null);
    } else {
      const newTaskId = tasks.length + 1;

      dispatch(startTask({
        taskType: "Management Activity",
        activity,
        boxId: null,
        userId: user!.id,
        startTime: timestamp,
        endTime: null,
        isPaused: false,
      }));
      dispatch(addEventLog({
        userId: user!.id,
        eventType: "Task Start",
        taskId: newTaskId,
        timestamp: timestamp,
      }));
      setActiveActivity(activity);
    }
  };

  const setBarcode = () => {}

  return (
    <div className='outletBox'>
      <div className="contentBlock">
        <div className={styles.workStatusBox}>
          <button onClick={handleWorkToggle} className={isActiveUser ? styles.workOnButton : styles.workOffButton}>
            {isActiveUser ? 'End Work' : 'Start Work'}
          </button>
          <div className={styles.workStatusLabel}>Status: {isActiveUser ? 'at work' : 'not at work'}</div>
        </div>
      </div>
      <div className="contentBlock">
        <fieldset>
          <legend>Work Events</legend>
          <button
            onClick={() => handleManagementTask("Team Meeting")}
            disabled={!!activeActivity && activeActivity !== "Team Meeting"}
          >
            {activeActivity === "Team Meeting" ? "End Team Meeting" : "Start Team Meeting"}
          </button>
          <button
            onClick={() => handleManagementTask("Training")}
            disabled={!!activeActivity && activeActivity !== "Training"}
          >
            {activeActivity === "Training" ? "End Training" : "Start Training"}
          </button>
          <button
            onClick={() => handleManagementTask("End of day Clean up")}
            disabled={!!activeActivity && activeActivity !== "End of day Clean up"}
          >
            {activeActivity === "End of day Clean up" ? "End Clean Up" : "Start Clean Up"}
          </button>
          <button
            onClick={() => handleManagementTask("Administrative Management")}
            disabled={!!activeActivity && activeActivity !== "Administrative Management"}
          >
            {activeActivity === "Administrative Management" ? "End Administrative Management" : "Start Administrative Management"}
          </button>
          <button disabled={!!activeActivity}>Add event</button>
        </fieldset>
      </div>
      <div className="contentBlock">
        <fieldset>
          <legend>Box Activity</legend>
          <div className={styles.boxActivity}>
            <div className={styles.boxSearch}>
              <CustomInput type="text" label="Barcode" placeholder="Barcode" required getValue={setBarcode} dark/>
              <button className={styles.fetchButton}>Fetch</button>
            </div>
            <div className={styles.boxProgress}>
              <div className={styles.boxStage}>
                <button>Inspection</button>
                <div className="status">in progress</div>
              </div>
              <div className={styles.boxStage}>
                <button>Preparation</button>
                <div className="status">in progress</div>
              </div>
              <div className={styles.boxStage}>
                <button>Scanning 1</button>
                <div className="status">in progress</div>
              </div>
              <div className={styles.boxStage}>
                <button>Scanning 2</button>
                <div className="status">in progress</div>
              </div>
              <div className={styles.boxStage}>
                <button>Review</button>
                <div className="status">in progress</div>
              </div>
            </div>
          </div>
        </fieldset>
      </div>
    </div>
  );
}

export default SoDashboard;
