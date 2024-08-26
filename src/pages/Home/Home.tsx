import styles from './Home.module.css';
import { Outlet } from 'react-router-dom'
import { Footer, Header } from '../../components'
import { useSelector } from 'react-redux';
import { RootState } from '../../data/types';
import { useEffect } from 'react';

const Home = () => {
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  const users = useSelector((state: RootState) => state.users.users);

  const userFromUsers = users.find(user => user.id === currentUser?.id);

  useEffect(() => {
    console.log('User from users array updated:', userFromUsers);
  }, [userFromUsers]);

  return (
      <div className="container">
        <Header/>
        <div className="contentBlock"><h2 className={styles.name}>{currentUser?.name}</h2></div>
        <Outlet/>
        <Footer/>
      </div>

  )
}

export default Home