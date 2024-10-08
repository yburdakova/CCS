
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import styles from './ProductionSheet.module.css';
import { formatDateTime } from '../../middleware/formatDate';

const ProductionSheet = () => {
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  const tasks = useSelector((state: RootState) =>
    currentUser ? state.tasks.tasks.filter(task => task.userId === currentUser.id) : []
  );

  return (
    <div className='outletBox'>
      <div className="contentBlock">
        <h2>Production Sheet</h2>
        {tasks.length > 0 ? (
          <ul className={styles.taskList}>
            {tasks.map(task => (
              <li key={task.id} className={styles.taskItem}>
                <div className={styles.taskName}>{task.activity}</div>
                <div className={styles.taskTime}>Start: {formatDateTime(task.startTime)}</div>
                <div className={styles.taskTime}>End: {task.endTime ? formatDateTime(task.endTime) : 'In Progress'}</div>
              </li>
            ))}
          </ul>
        ) : (
          <div>No tasks found for the current user.</div>
        )}
      </div>
    </div>
  );
};

export default ProductionSheet;
