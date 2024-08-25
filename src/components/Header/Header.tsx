import styles from './Header.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { loginFinish } from '../../redux/userRedux';
import { useNavigate } from 'react-router-dom';
import { FaPowerOff } from 'react-icons/fa6';
import { pmMenuLinks, soMenuLinks, tlMenuLinks } from '../../data/menu';
import { MenuItem } from '..';
import { MenuItemProps } from '../../data/types';

const Header = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const user = useSelector((state: RootState) => state.user.currentUser);

  const menuItems = user?.role == "pm" ? pmMenuLinks : user?.role == "tl" ? tlMenuLinks :soMenuLinks

  const handleClickLogout = () => {
    dispatch(loginFinish());
    navigate('/');
  }
  return (
    <header>
      <div className={styles.headerContainer}>
        <div className={styles.headerLogo}>BOXY</div>
        <nav>
          <ul>
          {menuItems.map((link: MenuItemProps) =>
            <MenuItem title={link.title} key={link.title} path={link.path}/>
          )}
          </ul>
        </nav>
        <div className={styles.iconBox} onClick={handleClickLogout} >
            <div className={styles.icon}><FaPowerOff /></div>
        </div>
      </div>
    </header>
  )
}

export default Header