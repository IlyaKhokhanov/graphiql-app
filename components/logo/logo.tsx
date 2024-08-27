import Link from 'next/link';
import Image from 'next/image';

import logo from './logo.webp';

import styles from './logo.module.css';
import { Path } from '@/constants/types';

export const Logo = () => {
  return (
    <Link href={Path.Home} className={styles.link}>
      <Image src={logo} alt="logo" width={100} priority />
    </Link>
  );
};
