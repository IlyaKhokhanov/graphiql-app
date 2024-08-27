import Image from 'next/image';

import logoCourse from './rsschool.svg';

import styles from './logoBottom.module.css';
import Link from 'next/link';

export const LogoBottom = () => {
  return (
    <Link href="https://rs.school/">
      <Image
        className={styles.logo}
        src={logoCourse as string}
        alt="course logo"
        width={100}
        priority
      />
    </Link>
  );
};
