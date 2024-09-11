'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FormattedMessage, IntlProvider } from 'react-intl';

import { IntlProps } from '../types';
import { getMessages } from '@/services/intl/wordbook';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/services/firebase';
import { IHistoryValue } from './history.props';
import { HistoryList, Loader } from '@/components';

import styles from './history.module.css';

export const History = ({ locale }: IntlProps) => {
  const [history, setHistory] = useState<IHistoryValue>({ rest: [], graph: [] });
  const [user, loading] = useAuthState(auth);
  const messages = getMessages(locale);
  const router = useRouter();

  useEffect(() => {
    if (loading) return;
    if (!user) {
      router.replace('/');
    } else {
      const storage = localStorage.getItem(user.uid);
      if (storage) {
        const jsonObject = JSON.parse(storage) as IHistoryValue;
        const restObj = jsonObject.rest.sort((a, b) => (a.id > b.id ? 1 : -1));
        const graphObj = jsonObject.graph.sort((a, b) => (a.id > b.id ? 1 : -1));
        setHistory({ rest: restObj, graph: graphObj });
      }
    }
  }, [user, loading, router]);

  if (!user) return <Loader />;

  return (
    <IntlProvider locale={locale} messages={messages}>
      <div className={styles.container}>
        <h1>
          <FormattedMessage id="history.header" />
        </h1>

        <div className={styles.history}>
          <div className={styles.block}>
            <h2 className={styles.header}>
              <FormattedMessage id="history.rest.header" />
            </h2>
            {history.rest.length ? (
              <HistoryList list={history.rest} locale={locale} />
            ) : (
              <Link className={styles.mainLink} href={`/${locale}/GET`}>
                <FormattedMessage id="history.rest" />
              </Link>
            )}
          </div>

          <div className={styles.block}>
            <h2 className={styles.header}>
              <FormattedMessage id="history.graph.header" />
            </h2>

            {history.graph.length ? (
              <HistoryList list={history.graph} locale={locale} />
            ) : (
              <Link className={styles.mainLink} href={`/${locale}/graphql/someUrl`}>
                <FormattedMessage id="history.graphql" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </IntlProvider>
  );
};

export default History;
