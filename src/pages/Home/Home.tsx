
import { Outlet } from 'react-router-dom'
import { Footer, Header } from '../../components'
import { useSelector } from 'react-redux';
import { RootState } from '../../data/types';

const Home = () => {
  const user = useSelector((state: RootState) => state.user.currentUser);
  console.log(user)
  return (
    <div>
      <div className="">Home</div>
        <Header/>
        <Outlet/>
        <Footer/>
    </div>
  )
}

export default Home