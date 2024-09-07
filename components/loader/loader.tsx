'use client';

import Image from 'next/image';

import styles from './loader.module.css';

export const Loader = () => {
  return (
    <div className={styles.loader}>
      <Image src="/loading-line.gif" alt="await" width={180} height={40} priority />
    </div>
  );
};
