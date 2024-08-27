import Link from 'next/link';

import { HEADER_MENU } from '@/constants';
import { Button } from '@/components';
import { NavBarProps } from './navBar.props';

import styles from './navBar.module.css';

export const NavBar = ({ isAuth }: NavBarProps) => {
  return (
    <nav className={styles.menu}>
      {HEADER_MENU.filter((menu) => menu.isAuth === isAuth).map((menu) => {
        if (isAuth) {
          return (
            <Link className={styles.link} key={menu.path} href={menu.path}>
              {menu.name}
            </Link>
          );
        } else {
          return (
            <Button className={styles.btn} key={menu.path}>
              <Link href={menu.path}>{menu.name}</Link>
            </Button>
          );
        }
      })}
    </nav>
  );
};
