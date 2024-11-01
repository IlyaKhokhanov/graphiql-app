'use client';

import { useEffect, useState } from 'react';
import { FormattedMessage, IntlProvider } from 'react-intl';

import { getMessages } from '@/services/intl/wordbook';
import { Button, InputsList } from '@/components';
import { ClientsHeadersProps } from './clientsHeaders.props';

import styles from './clientsHeaders.module.css';

export const ClientsHeaders = ({
  locale,
  list,
  changeInput,
  deleteInput,
  addInput,
  isHeader = true,
}: ClientsHeadersProps) => {
  const messages = getMessages(locale);

  const [headersVisible, setHeadersVisible] = useState(false);

  useEffect(() => {
    setHeadersVisible(list.length > 0);
  }, [list]);

  return (
    <IntlProvider locale={locale} messages={messages}>
      <div className={styles.blockFields}>
        <div className={styles.line}>
          <h3>
            <FormattedMessage id={`rest.${isHeader ? 'header' : 'param'}.header`} />
          </h3>

          <div
            className={styles.arrow}
            style={{ transform: headersVisible ? 'rotateX(0)' : 'rotateX(180deg)' }}
            onClick={() => setHeadersVisible((prev) => !prev)}
          >
            &#9660;
          </div>
        </div>
        {headersVisible && (
          <>
            {!isHeader && (
              <div className={styles.paramsDescription}>{messages['rest.param.description']}</div>
            )}
            <InputsList
              locale={locale}
              list={list}
              changeInput={changeInput}
              deleteInput={deleteInput}
            />
            <Button
              type="button"
              onClick={addInput}
              style={{ background: '#0cb4f1', alignSelf: 'flex-start', marginTop: '8px' }}
            >
              +
            </Button>
          </>
        )}
      </div>
    </IntlProvider>
  );
};
