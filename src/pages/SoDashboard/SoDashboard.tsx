import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../redux/store';
import { startWork, endWork } from '../../redux/usersRedux';
import { addEventLog } from '../../redux/eventsRedux';
import { timeToString } from '../../middleware/formatDate';
import styles from './SoDashboard.module.css';
import { CustomInput } from '../../components';

const SoDashboard = () => {
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  const user = useSelector((state: RootState) =>
    currentUser ? state.users.users.find(u => u.id === currentUser.id) : null
  );

  const isActiveUser = user?.isActive ?? false;
  const dispatch = useDispatch<AppDispatch>();

  const handleWorkToggle = () => {
    if (user) {
      const timestamp = timeToString(new Date());
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

  const setBarcode = () => {
    console.log("set barcode function")
  }

  return (
    <div className='outletBox'>
      <div className="contentBlock">
        <button onClick={handleWorkToggle} className={isActiveUser ? styles.workOnButton : styles.workOffButton}>
          {isActiveUser ? 'End Work' : 'Start Work'}
        </button>
      </div>
      <div className="contentBlock">
      <fieldset>
        <legend>Work Events</legend>
        <button>Team Meeting</button>
        <button>Training</button>
        <button>Clean Up</button>
        <button>Administrative Management</button>
        <button>Other</button>
      </fieldset>
      </div>
      <div className="contentBlock">
        <fieldset>
          <legend>Box Activity</legend>
          <div className={styles.boxSearch}>
            <CustomInput type="text" label="Barcode" placeholder="Barcode" required getValue={setBarcode} dark/>
            <button>Fetch</button>
          </div>

        </fieldset>
      </div>
    </div>
  );
}

export default SoDashboard;
