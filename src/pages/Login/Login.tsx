import { useNavigate } from 'react-router-dom';
import { CustomInput } from '../../components';
import { useDispatch, useSelector } from 'react-redux';
import styles from './Login.module.css';
import { useEffect, useState } from 'react';
import { AppDispatch, RootState } from '../../redux/store';
import { login } from '../../redux/apiCalls';
import { resetError } from '../../redux/userRedux';

const Login = () => {
  const user = useSelector((state: RootState) => state.user.currentUser);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { isFetching, error, userType } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    if (user) {
      if (userType === 'pm') {
        navigate('/manager');
      } else if (userType === 'tl') {
        navigate('/teamlead');
      } else if (userType === 'so') {
        navigate('/scanoperator');
      }
    }
  }, [user, userType, navigate]);

  useEffect(() => {
    dispatch(resetError());
  }, [dispatch, username, password]);

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    dispatch(login({ username, password }));
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <h1>
          Boxy
        </h1>
        <h3>Project Management Application <br></br>for High-Volume Scanning Projects</h3>
        <div className={styles.loginBox}>

          <div className={styles.p}>Enter your registration data</div>
          <form onSubmit={handleSubmit}>
            <CustomInput type="text" label="Username" placeholder="Username" required getValue={setUsername}/>
            <CustomInput type="password" label="Password" placeholder="Password" required getValue={setPassword}/>

            <button className={styles.button} type="submit" disabled={isFetching}>
              Log In
            </button>
            {error && (
              <div className={`${styles.error} ${styles.active}`}>{error}</div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
