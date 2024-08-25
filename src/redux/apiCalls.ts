import { loginStart, loginSuccess, loginFailure, adminAccess } from './userRedux';
import { users } from '../data/userData';
import { AppThunk } from './store';
import { LoginCredentials} from '../data/types';
import { setUsers } from './usersRedux';
import { tasks } from '../data/taskData';
import { eventLogs } from '../data/eventData';
import { setTasks } from './tasksRedux';
import { setEventLogs } from './eventsRedux';
import { setBoxes } from './boxesRedux';
import { boxes } from '../data/boxData';

export const login = ({ username, password }: LoginCredentials): AppThunk => {
  return (dispatch) => {
    dispatch(loginStart());

    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
      dispatch(loginSuccess(user));
      dispatch(adminAccess(user.role));
    } else {
      dispatch(loginFailure(401));
    }
  };
};

export const loadUsers = (): AppThunk => {
  return (dispatch) => {
    dispatch(setUsers(users));
  };
};

export const loadTasks = (): AppThunk => {
  return (dispatch) => {
    dispatch(setTasks(tasks));
  };
};

export const loadEventLogs = (): AppThunk => {
  return (dispatch) => {
    dispatch(setEventLogs(eventLogs));
  };
};

export const loadBoxes = (): AppThunk => {
  return (dispatch) => {
    dispatch(setBoxes(boxes));
  };
};