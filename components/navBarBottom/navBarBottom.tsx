import Link from 'next/link';

import { AUTHORS } from '@/constants';

import styles from './navBarBottom.module.css';

export const NavBarBottom = () => {
  return (
    <nav className={styles.authors}>
      {AUTHORS.map((author) => (
        <Link className={styles.link} key={author.name} href={author.link}>
          Author (Github) <strong>{author.name}</strong>
        </Link>
      ))}
    </nav>
  );
};
