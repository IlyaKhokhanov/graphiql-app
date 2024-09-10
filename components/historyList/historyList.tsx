import Link from 'next/link';

import { HistoryListProps } from './historyList.props';
import { getTime } from '@/utils/localstorage';

import styles from './historyList.module.css';

export const HistoryList = ({ list, locale }: HistoryListProps) => {
  return (
    <ul className={styles.list}>
      {list.map((el) => (
        <li key={el.id} className={styles.item}>
          <span>{getTime(el.id)}</span>
          <Link className={styles.link} href={`/${locale}${el.url}`}>
            {el.url}
          </Link>
        </li>
      ))}
    </ul>
  );
};
