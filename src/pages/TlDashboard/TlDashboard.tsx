import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

const TlDashboard = () => {
  const activeUsers = useSelector((state: RootState) => 
    state.users.users.filter(user => user.isActive)
  );

  return (
    <div className='outletBox'>
      <div className="contentBlock">
        <h3>Active Users</h3>
        <ul>
          {activeUsers.length > 0 ? (
            activeUsers.map(user => (
              <li key={user.id}>
                {user.name}
              </li>
            ))
          ) : (
            <li>No active users</li>
          )}
        </ul>
      </div>
    </div>
  );
}

export default TlDashboard;
