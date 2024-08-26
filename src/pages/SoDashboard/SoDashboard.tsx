import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../redux/store';
import { endTask } from '../../redux/tasksRedux';
import { addEventLog } from '../../redux/eventsRedux';
import { timeToString } from '../../middleware/formatDate';
import styles from './SoDashboard.module.css';
import { endWork, startWork } from '../../redux/usersRedux';
import { WorkEvents, BoxActivity } from '../../components';
import { setAtWork } from '../../redux/userRedux';
import { updateBox } from '../../redux/boxesRedux';
import { BoxData, BoxTaskTypes, PeriodOfTime } from '../../data/types';


const SoDashboard = () => {
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const user = useSelector((state: RootState) =>
    currentUser ? state.users.users.find(u => u.id === currentUser.id) : null
  );
  const currentBoxId = useSelector((state: RootState) => state.user.currentBox);
  const currentBoxProcess = useSelector((state: RootState) => state.user.currentBoxProcess);
  const boxes = useSelector((state: RootState) => state.boxes.boxes);

  const isActiveUser = user?.isActive ?? false;
  const dispatch = useDispatch<AppDispatch>();

  const startWorkFunction = () => {
    console.log("Work is started");
    const timestamp = timeToString(new Date());
    if (user) {
      dispatch(startWork(user.id));
      dispatch(setAtWork(true));
      dispatch(addEventLog({
        userId: user.id,
        eventType: "Work Start",
        taskId: null,
        timestamp: timestamp,
      }));
    }
  };

  const endWorkFunction = () => {
    console.log("Work is finished")
    const timestamp = timeToString(new Date());
  
    if (user) {
      dispatch(endWork(user.id));
      dispatch(setAtWork(false));
  
      const activeTask = tasks.find(task => task.userId === user.id && task.endTime === null);
      if (activeTask) {
        dispatch(endTask(activeTask.id));
        dispatch(addEventLog({
          userId: user.id,
          eventType: "Task End",
          taskId: activeTask.id,
          timestamp: timestamp,
        }));
        console.log("Task ended and event logged");
      }

      if (currentBoxId) {
        const currentBox = boxes.find(box => box.id === currentBoxId);
        const currentProcessType = currentBoxProcess as keyof BoxData;
        if (currentBox && currentProcessType) {
          const currentProcess = currentBox[currentProcessType] as BoxTaskTypes;
          if (currentProcess && currentProcess.periodsOfTime) {
            const updatedPeriodsOfTime = currentProcess.periodsOfTime.map((period: PeriodOfTime, index: number) =>
              index === currentProcess.periodsOfTime.length - 1
                ? { ...period, endTime: timestamp }
                : period
            );
            const updatedProcess = {
              ...currentProcess,
              periodsOfTime: updatedPeriodsOfTime,
              isPaused: true,
              inProgress: false,
            };

            const updatedBox = {
              ...currentBox,
              [currentProcessType]: updatedProcess,
            };

            dispatch(updateBox(updatedBox));
            console.log("Updated Box Data after endWork:", updatedBox);
          } else {
            console.warn("No active process found to update.");
          }
        } else {
          console.warn("No current box or process found.");
        }
      } else {
        console.warn("No current box ID found.");
      }

      dispatch(addEventLog({
        userId: user.id,
        eventType: "Work End",
        taskId: null,
        timestamp: timestamp,
      }));
      console.log("Work end event logged");
    }
  };


  const handleWorkToggle = () => {
    if (isActiveUser) {
      endWorkFunction();
    } else {
      startWorkFunction();
    }
  };

  return (
    <div className='outletBox'>
      <div className="wrapper">
        <div className="contentBlock">
          <div className={styles.workStatusBox}>
            <button onClick={handleWorkToggle} className={isActiveUser ? styles.workOnButton : styles.workOffButton}>
              {isActiveUser ? 'End Work' : 'Start Work'}
            </button>
            <div className={styles.workStatusLabel}>Status: {isActiveUser ? 'at work' : 'not at work'}</div>
          </div>
        </div>
        <WorkEvents userId={user!.id}/>
        <div className="contentBlock">
          <fieldset>
            <legend>Box Activity</legend>
            <BoxActivity/>
          </fieldset>
        </div>
      </div>
    </div>
  );
}

export default SoDashboard;