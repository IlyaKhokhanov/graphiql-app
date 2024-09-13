'use client';

import { FormattedMessage, IntlProvider } from 'react-intl';

import { getMessages } from '@/services/intl/wordbook';
import { Button, Input } from '@/components';
import { InputsListProps } from './inputsList.props';

import styles from './inputsList.module.css';

export const InputsList = ({ locale, list, changeInput, deleteInput }: InputsListProps) => {
  const messages = getMessages(locale);

  return (
    <IntlProvider locale={locale} messages={messages}>
      {list.map((el) => (
        <div className={styles.line} key={el.id}>
          <Input
            type="text"
            placeholder={messages['input.list.placeholder.key']}
            defaultValue={el.key}
            onBlur={(e) => changeInput(e.target.value, el.id, 'key')}
          />
          <Input
            type="text"
            placeholder={messages['input.list.placeholder.value']}
            defaultValue={el.value}
            onBlur={(e) => changeInput(e.target.value, el.id, 'value')}
          />
          <Button
            style={{ background: '#cf352e', padding: '8px 12px' }}
            type="button"
            onClick={() => deleteInput(el.id)}
          >
            <FormattedMessage id="rest.button.delete" />
          </Button>
        </div>
      ))}
    </IntlProvider>
  );
};
