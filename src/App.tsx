import './App.css'
import { useDispatch, useSelector } from 'react-redux';
import {
  BoxRegisration,
  BoxSearch,
  DeliverIntake,
  Home,
  Login,
  PersonalTasks,
  PmDashboard,
  ProductionSheet,
  Reports,
  SoDashboard,
  TasksAdjustment,
  TeamActivities,
  TlDashboard
} from './pages'
import {
  Navigate,
  Route,
  Routes,
  useLocation
} from 'react-router-dom'
import { useEffect, useRef } from 'react';
import { loginFinish } from './redux/userRedux';
import { RootState, AppDispatch } from './redux/store';
import { loadBoxes, loadEventLogs, loadTasks, loadUsers } from './redux/apiCalls';

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const userType = useSelector((state: RootState) => state.user.userType);

  useEffect(() => {
    dispatch(loadUsers());
  }, [dispatch]);
  const location = useLocation();
  const prevLocation = useRef(location.pathname);

  useEffect(() => {
    dispatch(loadUsers());
    dispatch(loadBoxes());
    dispatch(loadTasks());
    dispatch(loadEventLogs());
  }, [dispatch]);

  useEffect(() => {
    if (location.pathname === '/' && prevLocation.current !== '/') {
      dispatch(loginFinish());
    }
    prevLocation.current = location.pathname;
  }, [location, dispatch]);

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/manager" element={userType === "pm" ? <Home /> : <Navigate to="/" />} >
        <Route path="" element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<PmDashboard />} />
        <Route path="box-search" element={<BoxSearch />} />
        <Route path="box-registration" element={<BoxRegisration />} />
        <Route path="deliver-intake" element={<DeliverIntake />} />
        <Route path="reports" element={<Reports />} />
      </Route>
      <Route path="/teamlead" element={userType === "tl" ? <Home /> : <Navigate to="/" />} >
        <Route path="" element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<TlDashboard />} />
        <Route path="team-activities" element={<TeamActivities />} />
        <Route path="tasks-adjustment" element={<TasksAdjustment />} />
        <Route path="reports" element={<Reports />} />
      </Route>
      <Route path="/scanoperator" element={userType === "so" ? <Home /> : <Navigate to="/" />} >
        <Route path="" element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<SoDashboard />} />
        <Route path="production-sheet" element={<ProductionSheet />} />
        <Route path="personal-tasks" element={<PersonalTasks />} />
      </Route>
    </Routes>
  );
}

export default App;
