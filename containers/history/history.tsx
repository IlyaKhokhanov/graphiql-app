'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FormattedMessage, IntlProvider } from 'react-intl';

import { IntlProps } from '../types';
import { getMessages } from '@/services/intl/wordbook';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/services/firebase';

import styles from './history.module.css';

type clientValue = {
  id: number;
  url: string;
};

type historyT = {
  rest: clientValue[];
  graph: clientValue[];
};

export const History = ({ locale }: IntlProps) => {
  const [history, setHistory] = useState<historyT>({ rest: [], graph: [] });
  const [user, loading] = useAuthState(auth);
  const messages = getMessages(locale);
  const router = useRouter();

  useEffect(() => {
    if (!user) return;
    const storage = localStorage.getItem(user.uid);
    if (storage) {
      setHistory(JSON.parse(storage) as historyT);
    }
  }, [user]);

  useEffect(() => {
    if (loading) return;
    if (!user) router.replace('/');
  }, [user, loading, router]);

  return (
    <IntlProvider locale={locale} messages={messages}>
      <div className={styles.container}>
        <h1>
          <FormattedMessage id="history.header" />
        </h1>

        <div className={styles.history}>
          <div className={styles.block}>
            <h2>
              <FormattedMessage id="history.rest.header" />
            </h2>
            {history.rest.length ? (
              history.rest.map((el) => (
                <Link href={`/${locale}${el.url}`} key={el.id}>
                  {el.url}
                </Link>
              ))
            ) : (
              <Link href={`/${locale}/GET`}>
                <FormattedMessage id="history.rest" />
              </Link>
            )}
          </div>
          <div className={styles.block}>
            <h2>
              <FormattedMessage id="history.graph.header" />
            </h2>

            {history.graph.length ? (
              history.graph.map((el) => (
                <Link href={`/${locale}${el.url}`} key={el.id}>
                  {el.url}
                </Link>
              ))
            ) : (
              <Link href={`/${locale}/graphql/someUrl`}>
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
