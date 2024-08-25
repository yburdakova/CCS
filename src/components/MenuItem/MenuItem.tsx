import styles from './MenuItem.module.css';
import { MenuItemProps } from '../../data/types';
import { Link, useLocation } from 'react-router-dom';

const MenuItem = ({ title, path }: MenuItemProps) => {
  const location = useLocation();

  const currentPath = location.pathname.split('/').pop();
  const isActive = currentPath === path;

  return (
    <Link to={path} className={`${styles.link} ${isActive ? styles.active : ''}`}>
      <li className={styles.itemContainer}>
        <div className={styles.title}>{title}</div>
      </li>
    </Link>
  );
}

export default MenuItem;
