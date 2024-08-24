
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { users } from '../../data/userData';
import { loginSuccess, userAccess } from '../../redux/userRedux';


const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = (role: string) => {
    let currentUser;

    switch (role) {
      case 'pm':
        currentUser = users.find(user => user.name === 'Chris Koester');
        break;
      case 'tl':
        currentUser = users.find(user => user.name === 'Yana Burdakova');
        break;
      case 'so':
        currentUser = users.find(user => user.name === 'Olivia Parker');
        break;
      default:
        currentUser = null;
    }

    if (currentUser) {
      dispatch(loginSuccess(currentUser));
      dispatch(userAccess(currentUser.role));

      if (role === 'pm') {
        navigate('/manager');
      } else if (role === 'tl') {
        navigate('/teamlead');
      } else if (role === 'so') {
        navigate('/scanoperator');
      }
    }
  };

  return (
    <div>
      <h2>Choose the role</h2>
      <div className="button_container">
        <button onClick={() => handleLogin('pm')}>Project Manager</button>
        <button onClick={() => handleLogin('tl')}>Team Lead</button>
        <button onClick={() => handleLogin('so')}>Scanner Operator</button>
      </div>
    </div>
  );
};

export default Login;
