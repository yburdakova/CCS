import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../redux/store';
import { endTask } from '../../redux/tasksRedux';
import { addEventLog } from '../../redux/eventsRedux';
import { timeToString } from '../../middleware/formatDate';
import styles from './SoDashboard.module.css';
import { endWork, startWork } from '../../redux/usersRedux';
import { WorkEvents, BoxActivity } from '../../components';

const SoDashboard = () => {
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const user = useSelector((state: RootState) =>
    currentUser ? state.users.users.find(u => u.id === currentUser.id) : null
  );
  const users = useSelector((state: RootState) => state.users.users);
  const barcodes = useSelector((state: RootState) => state.boxes.barcodes);
  const boxes = useSelector((state: RootState) => state.boxes.boxes);

  const isActiveUser = user?.isActive ?? false;
  const dispatch = useDispatch<AppDispatch>();

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

        const activeManagementTask = tasks.find(task => task.userId === user.id && task.taskType === "Management Activity" && task.endTime === null);
        if (activeManagementTask) {
          dispatch(endTask(activeManagementTask.id));
          dispatch(addEventLog({
            userId: user.id,
            eventType: "Task End",
            taskId: activeManagementTask.id,
            timestamp: timestamp,
          }));
        }
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
      <WorkEvents userId={user!.id} isActiveUser={isActiveUser} />
      <div className="contentBlock">
        <fieldset>
          <legend>Box Activity</legend>
          <BoxActivity barcodes={barcodes} boxes={boxes} users={users} />
        </fieldset>
      </div>
    </div>
  );
}

export default SoDashboard;
